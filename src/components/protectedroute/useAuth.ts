import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "./AutContext";

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
