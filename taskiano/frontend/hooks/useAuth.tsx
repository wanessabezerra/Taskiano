import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/Provider";

export function useAuth() {
  return useContext(AuthContext);
}
