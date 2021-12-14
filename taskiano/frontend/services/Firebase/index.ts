import { app } from "./initService";
import firebase from "firebase/app";
import "firebase/auth";

import { FirebaseUser } from "../../@types";

export function getProvider(providerId: string): firebase.auth.AuthProvider {
  switch (providerId) {
    case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
      return new firebase.auth.GoogleAuthProvider();
    case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
      return new firebase.auth.FacebookAuthProvider();
    case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
      return new firebase.auth.TwitterAuthProvider();
    case firebase.auth.GithubAuthProvider.PROVIDER_ID:
      return new firebase.auth.GithubAuthProvider();
    default:
      throw new Error(`No provider implemented for ${providerId}`);
  }
}

export function assembleUser(user: FirebaseUser) {
  return {
    id: user.uid,
    name: user.displayName,
    avatar: user.photoURL,
    email: user.email,
  };
}

export const ErrorAccountExists = (code: string) => {
  return code === "auth/account-exists-with-different-credential";
};

export const auth = app.auth();

export { app };
