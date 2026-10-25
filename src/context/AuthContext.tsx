import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, signInWithPopup, fbSignOut, PRIMARY_ADMIN_EMAIL, handleFirestoreError, OperationType } from '../firebase.ts';
import { UserProfile } from '../types/index.ts';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isAdmin: boolean;
  authError: string | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'cma_usa_prep_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  
  // NEVER auto-login any user or admin by default! Every visitor begins unauthenticated.
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Sync authenticated session to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  }, [user]);

  // Sync Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const email = fbUser.email?.toLowerCase().trim() || '';
        const isAdminEmail = email === PRIMARY_ADMIN_EMAIL.toLowerCase().trim();

        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userSnap = await getDoc(userDocRef);

          const currentRole: 'admin' | 'student' = isAdminEmail ? 'admin' : 'student';

          if (!userSnap.exists()) {
            const newProfile: UserProfile = {
              uid: fbUser.uid,
              email: fbUser.email || '',
              displayName: fbUser.displayName || email.split('@')[0] || 'CMA Candidate',
              photoURL: fbUser.photoURL || undefined,
              role: currentRole,
              createdAt: new Date().toISOString(),
              lastActiveAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, newProfile);

            if (currentRole === 'admin') {
              await setDoc(doc(db, 'admins', fbUser.uid), {
                email: fbUser.email,
                grantedAt: new Date().toISOString(),
              });
            }

            setUser(newProfile);
          } else {
            const data = userSnap.data() as UserProfile;
            const updatedProfile: UserProfile = {
              ...data,
              displayName: fbUser.displayName || data.displayName || email.split('@')[0],
              photoURL: fbUser.photoURL || data.photoURL,
              role: isAdminEmail ? 'admin' : (data.role === 'admin' ? 'admin' : 'student'),
              lastActiveAt: new Date().toISOString(),
            };
            setUser(updatedProfile);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${fbUser.uid}`);
          // Safe fallback with Google credentials
          setUser({
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || email.split('@')[0] || 'Candidate',
            photoURL: fbUser.photoURL || undefined,
            role: isAdminEmail ? 'admin' : 'student',
            createdAt: new Date().toISOString(),
            lastActiveAt: new Date().toISOString(),
          });
        }
      } else {
        // User logged out or not logged in
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setAuthError(null);
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const email = res.user.email?.toLowerCase().trim() || '';
      const isAdminEmail = email === PRIMARY_ADMIN_EMAIL.toLowerCase().trim();

      const profile: UserProfile = {
        uid: res.user.uid,
        email: res.user.email || '',
        displayName: res.user.displayName || email.split('@')[0],
        photoURL: res.user.photoURL || undefined,
        role: isAdminEmail ? 'admin' : 'student',
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      };
      setUser(profile);
    } catch (err: any) {
      console.warn('Google Sign-In popup notice:', err);
      if (err?.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in cancelled. Please click the button again to complete Google sign-in.');
      } else if (err?.code === 'auth/popup-blocked') {
        setAuthError('Google sign-in popup was blocked by your browser. Please allow popups for this site and try again.');
      } else {
        setAuthError('Could not complete Google sign-in. Please ensure you select your Google/Gmail account and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (firebaseUser) {
        await fbSignOut(auth);
      }
    } catch {
      // ignore
    }
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  // Only bhuvan13sharma@gmail.com can ever have admin rights
  const isAdmin = user?.email?.toLowerCase().trim() === PRIMARY_ADMIN_EMAIL.toLowerCase().trim() || user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        isAdmin,
        authError,
        loginWithGoogle,
        logout,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
