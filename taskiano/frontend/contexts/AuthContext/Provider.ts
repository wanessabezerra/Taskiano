import { createContext } from "use-context-selector";
import type { User } from "../../@types";

export type AuthContextType = {
  user?: User;
  token?: string | null;
  authenticated: boolean;
  signIn: (providerId: string) => void;
  signOut: () => void;
  updateScore: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);
