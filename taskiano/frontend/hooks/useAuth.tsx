import { useContextSelector } from "use-context-selector";
import { AuthContext, AuthContextType } from "../contexts/AuthContext/Provider";

export function useAuth(selector: (value: AuthContextType) => any) {
  return useContextSelector(AuthContext, selector);
}
