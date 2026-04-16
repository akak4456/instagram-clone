import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loginUser, logoutUser, restoreUser } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = useCallback(async (formData) => {
    setAuthLoading(true);

    try {
      const result = await loginUser(formData);

      if (!result.success) {
        return result;
      }

      setUser(result.user);

      return {
        success: true,
        user: result.user,
      };
    } catch (error) {
      console.error("로그인 실패:", error);

      return {
        success: false,
        message: "로그인 중 오류가 발생했습니다.",
      };
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  useEffect(() => {
    try {
      const savedUser = restoreUser();

      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error("사용자 복원 실패:", error);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLogin: !!user,
      authLoading,
      login,
      logout,
    }),
    [user, authLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
