import { createContext } from "react";
import User from "../../@types/User";

type AuthContextType = {
  user: User | undefined;
  signIn: (providerId:string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);
