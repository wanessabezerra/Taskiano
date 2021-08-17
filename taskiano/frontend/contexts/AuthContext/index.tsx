import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { app, auth } from "../../services/Firebase";
import { UserRest } from "../../services/api";

import { AuthContext } from "./Provider";

import type { User, FirebaseUser } from "../../@types";

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  async function getToken() {
    return app.auth().currentUser?.getIdToken(true);
  }
  
  async function tryFillUser(_user: FirebaseUser | null) {
    const token = await getToken();

    if (_user) {
      const userRecord =
        (await UserRest.get(token)) ??
        (await UserRest.create({
          userData: {
            id: _user.uid,
            name: _user.displayName,
            avatar: _user.photoURL,
            email: _user.email,
          },
          token: token ?? "",
        }));

      if (userRecord) {
        if (userRecord.hasOwnProperty("length")) {
          // Bug unknown
          // If the user record is an array, we need to get the first element
          const userList: User[] = Array.from(userRecord as any);
          setUser(userList[0]);
        } else setUser(userRecord);

        router.push("/home");
      } else throw new Error("User record not found");
    }
  }

  async function signIn(providerId: string) {
    let provider;

    if (providerId === "google") {
      provider = new app.auth.GoogleAuthProvider();
    } else if (providerId === "facebook") {
      provider = new app.auth.FacebookAuthProvider();
    } else if (providerId === "twitter") {
      provider = new app.auth.TwitterAuthProvider();
    } else if (providerId === "github") {
      provider = new app.auth.GithubAuthProvider();
    } else {
      throw new Error("Unknown provider");
    }

    const result = await auth.signInWithPopup(provider);

    await tryFillUser(result.user);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((_user) => tryFillUser(_user));
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
