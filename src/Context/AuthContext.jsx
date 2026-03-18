import { createContext, useEffect, useMemo, useState } from "react";
import {
  getAccessToken,
  logout as logoutRequest,
  setAuthFailureHandler,
} from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getAccessToken());

  useEffect(() => {
    setAuthFailureHandler(() => {
      setToken(null);
    });

    return () => {
      setAuthFailureHandler(null);
    };
  }, []);

  const login = () => {
    setToken(getAccessToken());
  };

  const logout = async () => {
    await logoutRequest();
    setToken(null);
  };

  const authValue = useMemo(
    () => ({ token, login, logout }),
    [token]
  );

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}