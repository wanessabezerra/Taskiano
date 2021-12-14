import { ReactNode, useEffect, useState } from "react";

import type { NextRouter } from "next/router";
import type { User } from "../../@types";

import { UserRest } from "../../services/api";
import { assembleUser } from "../../services/Firebase";

import { ToastDisconnected, ToastTrySignInAgain } from "../../utils/toasts";

import { AuthContext } from "./Provider";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

interface AuthContextProviderProps {
  router: NextRouter;
  children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [authenticated, setAuthenticated] = useState(false);

  const fbAuth = useFirebaseAuth({
    loginPage: "/",
    router: props.router,
    onSignOut: () => {
      setUser(undefined);
      setAuthenticated(false);
    },
  });

  const isDisconnected = () => {
    return !fbAuth.user && fbAuth.mounted && props.router.pathname !== "/";
  };

  const handleAuth = (u: User) => {
    setUser(u);
    setAuthenticated(true);
    props.router.push("/home");
  };

  const fetchUser = async () => {
    if (!fbAuth.user || !fbAuth.token) return;
    let userRecord;

    try {
      userRecord =
        (await UserRest.get(fbAuth.user.uid, fbAuth.token)) ??
        (await UserRest.create(assembleUser(fbAuth.user), fbAuth.token));

      if (userRecord) handleAuth(userRecord);
    } catch (e) {
      ToastTrySignInAgain();
    }
  };

  const updateScore = async () => {
    const new_score = await UserRest.getScore(user?.id, fbAuth?.token);

    setUser({ ...user, score: new_score });
  };

  useEffect(() => {
    setAuthenticated(fbAuth.token && user ? true : false);
  }, [fbAuth.token, user]);

  useEffect(() => {
    if (fbAuth.user && fbAuth.token) {
      fetchUser();
    } else if (isDisconnected()) {
      ToastDisconnected();
      props.router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbAuth.user, fbAuth.token, fbAuth.mounted]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token: fbAuth.token,
        authenticated,
        signIn: fbAuth.signIn,
        signOut: fbAuth.signOut,
        updateScore,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
