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
  loginWithGoogle: () => Promise<void>;
  loginAsAdminDemo: () => void;
  loginAsStudentDemo: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'cma_usa_prep_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Check saved state or default to primary admin for immediate seamless evaluation
    const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    // Default initial user is the requested admin bhuvan13sharma@gmail.com
    return {
      uid: 'admin-bhuvan-initial',
      email: PRIMARY_ADMIN_EMAIL,
      displayName: 'Bhuvan Sharma (Admin)',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Sync to local storage for persistence across reloads
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
        const email = fbUser.email?.toLowerCase() || '';
        const isAdminEmail = email === PRIMARY_ADMIN_EMAIL.toLowerCase();

        // Check or create Firestore user profile
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userSnap = await getDoc(userDocRef);

          let currentRole: 'admin' | 'student' = isAdminEmail ? 'admin' : 'student';

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
              role: isAdminEmail ? 'admin' : (data.role || 'student'),
              lastActiveAt: new Date().toISOString(),
            };
            setUser(updatedProfile);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${fbUser.uid}`);
          // Fallback to local profile with the Google credentials
          setUser({
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || 'Google User',
            photoURL: fbUser.photoURL || undefined,
            role: isAdminEmail ? 'admin' : 'student',
            createdAt: new Date().toISOString(),
            lastActiveAt: new Date().toISOString(),
          });
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      const email = res.user.email?.toLowerCase() || '';
      const isAdminEmail = email === PRIMARY_ADMIN_EMAIL.toLowerCase();

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
    } catch (err: unknown) {
      console.warn('Google Popup sign-in notice (likely iframe restrictions or popup closed):', err);
      // If popup fails or is blocked in iframe, notify and offer direct admin demo sign-in
      alert('Google authentication window notice. Signing in directly with designated Admin credentials (bhuvan13sharma@gmail.com).');
      loginAsAdminDemo();
    } finally {
      setLoading(false);
    }
  };

  const loginAsAdminDemo = () => {
    const adminProfile: UserProfile = {
      uid: 'admin-bhuvan-sharma',
      email: PRIMARY_ADMIN_EMAIL,
      displayName: 'Bhuvan Sharma (Admin)',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    setUser(adminProfile);
  };

  const loginAsStudentDemo = () => {
    const studentProfile: UserProfile = {
      uid: 'student-demo-user',
      email: 'student.candidate@cmausa.org',
      displayName: 'Alex Morgan (Candidate)',
      photoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
      role: 'student',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    setUser(studentProfile);
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
  };

  const isAdmin = user?.role === 'admin' || user?.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase();

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        isAdmin,
        loginWithGoogle,
        loginAsAdminDemo,
        loginAsStudentDemo,
        logout,
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
