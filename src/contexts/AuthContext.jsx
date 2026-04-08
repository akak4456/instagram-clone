// contexts/AuthContext.js
import { createContext, useEffect, useState } from "react";
import { loginApi } from "../mocks/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = async (formData) => {
    setAuthLoading(true);
    const result = await loginApi(formData);
    setAuthLoading(false);

    if (!result.success) return result;

    setUser(result.user);
    localStorage.setItem("user", JSON.stringify(result.user));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setAuthLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin: !!user,
        authLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
