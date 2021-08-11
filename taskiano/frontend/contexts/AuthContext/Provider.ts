import { createContext } from "react";
import User from "../../@types/User";

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);
