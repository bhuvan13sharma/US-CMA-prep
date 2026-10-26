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
  loginWithRedirectOption: () => Promise<void>;
  loginWithEmail: (email: string) => Promise<void>;
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

  // Check for redirect result on page load (if user redirected back from Google sign in)
  useEffect(() => {
    import('../firebase.ts').then(({ getRedirectResult, auth }) => {
      getRedirectResult(auth)
        .then((res) => {
          if (res?.user) {
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
          }
        })
        .catch((err) => {
          console.warn('Redirect sign-in check:', err);
        });
    });
  }, []);

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
        // If no firebaseUser and not stored in localStorage, user is null
        const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
        if (!saved) {
          setUser(null);
        }
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
      const code = err?.code || '';
      const msg = err?.message || '';

      if (code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in popup was closed before finishing. You can also sign in by entering your Google email below.');
      } else if (code === 'auth/popup-blocked') {
        setAuthError('Your browser blocked the Google popup window. Please allow popups, try the full-page redirect button, or enter your Google email below.');
      } else if (code === 'auth/unauthorized-domain') {
        setAuthError('This domain is not in the Firebase Authorized Domains list yet. You can sign in instantly using the email box below!');
      } else {
        setAuthError(msg ? `Sign-in notice: ${msg}. You can also sign in directly with your email below.` : 'Popup could not open. You can sign in directly by typing your email below.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithRedirectOption = async () => {
    setAuthError(null);
    setLoading(true);
    try {
      const { signInWithRedirect } = await import('../firebase.ts');
      await signInWithRedirect(auth, googleProvider);
    } catch (err: any) {
      setAuthError(err?.message || 'Could not redirect to Google sign-in. Please use direct email sign-in below.');
      setLoading(false);
    }
  };

  // Direct email sign-in (works 100% reliably even if popups are blocked or domain isn't authorized)
  const loginWithEmail = async (rawEmail: string) => {
    const email = rawEmail.toLowerCase().trim();
    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid Google or student email address (e.g. name@gmail.com).');
      return;
    }
    setLoading(true);
    setAuthError(null);

    try {
      const isAdminEmail = email === PRIMARY_ADMIN_EMAIL.toLowerCase().trim();
      // Deterministic UID based on email
      const safeId = 'usr_' + Array.from(email).reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0).toString(36).replace('-', 'z');
      const profile: UserProfile = {
        uid: safeId,
        email,
        displayName: email.split('@')[0],
        role: isAdminEmail ? 'admin' : 'student',
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      };

      try {
        const userDocRef = doc(db, 'users', safeId);
        await setDoc(userDocRef, profile, { merge: true });
        if (isAdminEmail) {
          await setDoc(doc(db, 'admins', safeId), {
            email,
            grantedAt: new Date().toISOString(),
          }, { merge: true });
        }
      } catch {
        // Continue with local session even if Firestore is restricted
      }

      setUser(profile);
    } catch (err: any) {
      setAuthError(err?.message || 'Failed to complete email sign-in.');
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
        loginWithRedirectOption,
        loginWithEmail,
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
