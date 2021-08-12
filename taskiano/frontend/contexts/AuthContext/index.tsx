import { ReactNode, useEffect, useState } from "react";

import type User from "../../@types/User";
import firebaseService from "../../services/Firebase";
import { AuthContext } from "./Provider";
import { User as UserRest } from "../../services/api/User.rest";

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  async function tryFillUser(_user: any) {
    if (_user) {
      let userRecord =
        (await UserRest.get(_user.uid)) ??
        (await UserRest.create({
          id: _user.uid,
          name: _user.displayName,
          avatar: _user.photoURL,
          email: _user.email,
        } as User));

      if (userRecord) setUser(userRecord);
      else throw new Error("User record not found");
    }
  }

  useEffect(() => console.log(user), [user]);

  useEffect(() => {
    const unsubscribe = firebaseService.auth.onAuthStateChanged((_user) => {
      tryFillUser(_user)
        .then(() => {
          console.log("unsubscribe");
        })
        .catch((e) => {
          console.log(e);
        });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signIn(providerId: string) {
    let provider;

    if (providerId === "google") {
      provider = new firebaseService.firebase.auth.GoogleAuthProvider();
    } else if (providerId === "facebook") {
      provider = new firebaseService.firebase.auth.FacebookAuthProvider();
    } else if (providerId === "twitter") {
      provider = new firebaseService.firebase.auth.TwitterAuthProvider();
    } else if (providerId === "github") {
      provider = new firebaseService.firebase.auth.GithubAuthProvider();
    } else {
      throw new Error("Unknown provider");
    }

    const result = await firebaseService.auth.signInWithPopup(provider);

    await tryFillUser(result.user);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
