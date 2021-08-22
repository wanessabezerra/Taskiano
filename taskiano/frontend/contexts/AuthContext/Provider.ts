import { createContext } from "react";
import type { User } from "../../@types";

type AuthContextType = {
  user?: User;
  signIn: (providerId: string) => Promise<void>;
  getToken: () => Promise<string | undefined>;
};

export const AuthContext = createContext({} as AuthContextType);
