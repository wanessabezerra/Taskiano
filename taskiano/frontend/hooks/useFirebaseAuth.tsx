import { useEffect, useState } from "react";
import firebase from "firebase/app";

import {
  ToastEmailExists,
  ToastComeBackSoon,
  ToastTryOtherProvider,
  ToastFoundedEmail,
} from "../utils/toasts";

import { auth, ErrorAccountExists, getProvider } from "../services/Firebase";
import { NextRouter } from "next/router";

type Auth = {
  user: firebase.User | null;
  token: string | null;
  mounted: boolean;
};

type useFirebaseAuthReturn = {
  user: firebase.User | null;
  token: string | null;
  mounted: boolean;
  signIn: (providerId: string) => void;
  signOut: () => void;
};

interface UseFirebaseAuthProps {
  onSignOut?: () => void;
  router: NextRouter;
  loginPage: string;
}

function useFirebaseAuth(props: UseFirebaseAuthProps): useFirebaseAuthReturn {
  const [state, setState] = useState<Auth>({
    user: auth.currentUser,
    token: null,
    mounted: true,
  });

  const fillAuth = (fbUser: firebase.User | null) => {
    fbUser?.getIdToken(true).then((_token) => {
      if (state.user !== fbUser || state.token !== _token) {
        setState({ user: fbUser, token: _token, mounted: true });
        if (props.router.pathname === props.loginPage && fbUser && _token) {
          ToastFoundedEmail();
        }
      }
    });
  };

  const linkAccounts = (email: string) => {
    auth.fetchSignInMethodsForEmail(email).then((methods) => {
      ToastEmailExists(methods[0], email);
      setTimeout(() => auth.signInWithRedirect(getProvider(methods[0])), 5000);
    });
  };

  const signIn = (providerId: string) => {
    auth
      .signInWithPopup(getProvider(providerId))
      .then((fbUser) => fillAuth(fbUser.user))
      .catch((error) => {
        if (ErrorAccountExists(error.code)) {
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

    auth
      .getRedirectResult()
      .then((fbUser) => fillAuth(fbUser.user))
      .catch(() => ToastTryOtherProvider());

    return auth.onAuthStateChanged((fbUser) => fillAuth(fbUser));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user: state.user,
    token: state.token,
    mounted: state.mounted,
    signIn,
    signOut,
  };
}

export default useFirebaseAuth;
