import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import firebase from '../lib/firebase';

interface AuthContextData {
  user: firebase.default.User;
  signUpWithEmailAndPassword(
    name: string,
    email: string,
    password: string,
  ): Promise<void>;
  signInWithEmailAndPassword(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.default.User | null>(null);

  const signUpWithEmailAndPassword = useCallback(
    async (name, email, password) => {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      const createdUser = firebase.auth().currentUser;

      createdUser
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          createdUser.sendEmailVerification();
        });
    },
    [],
  );

  const signInWithEmailAndPassword = useCallback(async (email, password) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    setUser(response.user);
  }, []);

  const signOut = useCallback(async () => {
    await firebase.auth().signOut();
    setUser(null);
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async changedUser => {
        if (changedUser) {
          setUser(changedUser);
        } else {
          await firebase.auth().signOut();
          setUser(null);
        }
      });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
