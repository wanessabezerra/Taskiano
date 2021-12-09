import { ReactNode, useEffect, useState } from "react";
import type { NextRouter } from "next/router";

import { AuthContext } from "./Provider";
import { UserController } from "../../lib";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { ToastDisconnected, ToastTrySignInAgain } from "../../utils/toasts";
import type { IUser } from "../../types";

interface IAuthContextProvider {
  router: NextRouter;
  children: ReactNode;
}

export function AuthContextProvider(props: IAuthContextProvider) {
  const [user, setUser] = useState<IUser>();
  const [authenticated, setAuthenticated] = useState(false);

  const fireAuth = useFirebaseAuth({
    loginPage: "/",
    router: props.router,
    onSignOut: () => {
      setUser(undefined);
      setAuthenticated(false);
    },
  });

  const isDisconnected = () => {
    return !fireAuth.user && fireAuth.mounted && props.router.pathname !== "/";
  };

  const handleAuth = (u: IUser) => {
    setUser(u);
    setAuthenticated(true);
    props.router.push("/home");
  };

  const fetchUser = async () => {
    if (!fireAuth.user) return;
    let userRecord;

    try {
      userRecord = await UserController.get(fireAuth.user.uid);

      if (!userRecord) {
        userRecord = await UserController.create(
          UserController.assembleUser(fireAuth.user),
          fireAuth.user.uid
        );
      }

      userRecord && handleAuth(userRecord);
    } catch (e) {
      console.error(e);
      ToastTrySignInAgain();
    }
  };

  useEffect(() => {
    setAuthenticated(fireAuth.user ? true : false);
  }, [fireAuth.user]);

  useEffect(() => {
    if (fireAuth.user && fireAuth.mounted) fetchUser();
    else if (isDisconnected()) {
      if (props.router.pathname !== "/" && props.router.pathname !== "/login")
        ToastDisconnected();
        props.router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fireAuth.user, fireAuth.mounted]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        signIn: fireAuth.signIn,
        signOut: fireAuth.signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
