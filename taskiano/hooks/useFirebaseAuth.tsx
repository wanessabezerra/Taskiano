import { useEffect, useState } from "react";
import type { NextRouter } from "next/router";

import {
  fetchSignInMethodsForEmail,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  User as IFirebaseUser,
} from "firebase/auth";

import { UserController } from "../lib";
import { auth } from "../services/Firebase";

import {
  ToastEmailExists,
  ToastComeBackSoon,
  ToastTryOtherProvider,
  ToastFoundedEmail,
} from "../utils/toasts";

interface IAuth {
  user: IFirebaseUser | null;
  token: string | null;
  mounted: boolean;
}

interface IUseFirebaseAuth {
  onSignOut?: () => void;
  loginPage: string;
  router: NextRouter;
}

function useFirebaseAuth(props: IUseFirebaseAuth) {
  const [state, setState] = useState<IAuth>({
    user: auth.currentUser,
    token: null,
    mounted: true,
  });

  const fillAuth = (fireUser: IFirebaseUser | null) => {
    fireUser?.getIdToken(true).then((token) => {
      if (state.user !== fireUser || state.token !== token) {
        setState({ user: fireUser, token, mounted: true });

        if (props.router.pathname === props.loginPage && fireUser && token) {
          ToastFoundedEmail();
        }
      }
    });
  };

  const linkAccounts = (email: string) => {
    fetchSignInMethodsForEmail(auth, email).then((methods) => {
      ToastEmailExists(methods[0], email);

      setTimeout(
        () => signInWithRedirect(auth, UserController.getProvider(methods[0])),
        5000
      );
    });
  };

  const signIn = (providerId: string) => {
    signInWithPopup(auth, UserController.getProvider(providerId))
      .then((fbUser) => fillAuth(fbUser.user))
      .catch((error) => {
        if (UserController.ErrorAccountExists(error.code)) {
          linkAccounts(error.email);
        } else {
          ToastTryOtherProvider();
        }
      });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      setState({ user: null, token: null, mounted: true });

      indexedDB.deleteDatabase("firebaseLocalStorageDb");

      ToastComeBackSoon();
      props.onSignOut && props.onSignOut();
      props.router.push(props.loginPage);
    });
  };

  useEffect(() => {
    auth.currentUser?.getIdToken(true).then((token) => {
      setState({ user: auth.currentUser, token, mounted: true });
    });

    getRedirectResult(auth)
      .then((fbUser) => fbUser && fillAuth(fbUser.user))
      .catch(() => ToastTryOtherProvider());

    return onAuthStateChanged(auth, (fbUser) => fillAuth(fbUser));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user: state.user,
    mounted: state.mounted,
    signIn,
    signOut,
  };
}

export default useFirebaseAuth;
