import { ReactNode, useEffect, useState } from "react";

import firebaseService from "../../services/Firebase";
import { AuthContext } from "./Provider";
import User from "../../@types/User";

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  function tryFillUser(_user: any) {
    if (_user) {
      const { displayName, photoURL, uid } = _user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  useEffect(() => {
    const unsubscribe = firebaseService.auth.onAuthStateChanged((_user) => {
      tryFillUser(_user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebaseService.firebase.auth.GoogleAuthProvider();
    const result = await firebaseService.auth.signInWithPopup(provider);

    tryFillUser(result.user);
  }

  async function signInWithTwitter() {
    const provider = new firebaseService.firebase.auth.TwitterAuthProvider();
    const result = await firebaseService.auth.signInWithPopup(provider);

    tryFillUser(result.user);
  }

  async function signInWithGithub() {
    const provider = new firebaseService.firebase.auth.GithubAuthProvider();
    const result = await firebaseService.auth.signInWithPopup(provider);

    tryFillUser(result.user);
  }

  async function signInWithFacebook() {
    const provider = new firebaseService.firebase.auth.FacebookAuthProvider();
    const result = await firebaseService.auth.signInWithPopup(provider);

    tryFillUser(result.user);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithTwitter,
        signInWithGithub,
        signInWithFacebook,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
