import { ReactNode, useCallback, useEffect, useState } from "react";
import firebase from "firebase/app";

import { UserRest } from "../../services/api";
import { AuthContext } from "./Provider";

import {
  auth,
  getProvider,
  assembleDataUser,
  ErrorAccountExists,
} from "../../services/Firebase";

import { ToastTryAgain, ToastEmailExists } from "../../utils/toasts";
import { sleepSync } from "../../utils";

import type { NextRouter } from "next/router";
import type { User, FirebaseUser } from "../../@types";

interface AuthContextProviderProps {
  router: NextRouter;
  children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [mounted, setMounted] = useState(false);

  /**
   * Handle of auth state change
   * @param _user - firebase user
   *
   *  Single function of performing user authentication, defining
   *  the state of User and Token (from Fetchuser) and indicating that the
   *  Context hooks have been initialized.
   * */
  const handleAuth = (_user: firebase.User | null) => {
    if (!_user) return setMounted(true);

    _user
      ?.getIdToken()
      .then((_token) => {
        setToken(_token);
        fetchUser(_user, _token);
      })
      .catch((error) => console.error(error));
  };

  /**
   * Performs user logout and redirects to the home page
   * () => void
   *
   *  Performs the user logout, deleting the current state, the data
   *  from indexeddb and iDtoken.Finally redirects to the home page.
   * */
  const signOut = useCallback(() => {
    setUser(undefined);
    setToken(undefined);

    auth
      .signOut()
      // Delete local storage data
      .then(() => indexedDB.deleteDatabase("firebaseLocalStorageDb"))
      .catch((error) => console.error(error));

    props.router.push("/");
  }, [props.router]);

  /**
   * Search for user data in the Taskiano database or create a new
   * user
   *
   * @param _user - firebase user
   * @param _token - firebase idToken
   *
   *  Performs the user search in the taskian database and, if not
   *  Find, create a new user.The token is passed as a parameter for
   *  Do not need to wait for REACT status update.
   * */
  const fetchUser = useCallback(
    async (_user?: FirebaseUser | null, _token?: string) => {
      if (!_user || !_token) return;

      let userRecord;

      try {
        userRecord =
          (await UserRest.get(_user.uid, _token)) ??
          // assembleDataUser: Fill user data with the data from firebase
          (await UserRest.create(assembleDataUser(_user), _token));

        setUser(userRecord);
        props.router.push("/home");
      } catch (error) {
        console.error(error);
        ToastTryAgain();
      }
    },
    [props.router]
  );

  /**
   * signIn with Firebase External Provider's
   *
   * @param providerId - [case in getProvider switch]
   *
   *  Performs authentication with login popups (or redirection, if there
   *  is an equal e-mail account in another provider, to avoid duplication
   *  of user consts)
   * */
  const signIn = (providerId: string) => {
    const provider = getProvider(providerId);
    var userCred: firebase.auth.UserCredential = {} as any;

    auth
      .signInWithPopup(provider)
      .then((_userCred) => (userCred = _userCred))
      .catch((error) => {
        // Check if email exists in another provider
        if (ErrorAccountExists(error.code)) {
          auth
            .fetchSignInMethodsForEmail(error.email)
            .then((methods) => {
              const _provider = getProvider(methods[0]);

              ToastEmailExists(_provider?.providerId);
              sleepSync(2000, () => auth.signInWithRedirect(_provider));
            })
            .catch((err) => {
              console.error(err);
              ToastTryAgain();
            });
        } else {
          console.error(error);
          ToastTryAgain();
        }
      });

    handleAuth(userCred.user);
  };

  /**
   * Updates user after redirection in case of duplicate account
   * listen for signInWithRedirect**
   */
  useEffect(() => {
    auth
      .getRedirectResult()
      .then((userCred) => handleAuth(userCred.user))
      .catch((error) => console.error("getRedirectResult", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Updates the user every time the authentication state changes
   */
  useEffect(() => {
    return auth.onAuthStateChanged((userCred) => {
      if (!userCred && mounted) signOut();
      else handleAuth(userCred);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
