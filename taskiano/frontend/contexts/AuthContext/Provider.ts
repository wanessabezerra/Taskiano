import { createContext } from 'use-context-selector';
import type { User } from "../../@types";

export type AuthContextType = {
  user?: User;
  token?: string;
  signIn: (providerId: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);
