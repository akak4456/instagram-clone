import { createContext, useContext, useEffect, useState } from "react";
import { users as initialUsers } from "../mocks/users";
import { loginApi, addUserApi, fetchUsersApi } from "../mocks/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 로그인
  const login = async (formData) => {
    setLoading(true);
    const result = await loginApi(formData);
    setLoading(false);

    if (!result.success) return result;

    setUser(result.user);
    localStorage.setItem("user", JSON.stringify(result.user));

    return { success: true };
  };

  const addUser = async (formData) => {
    setLoading(true);
    const result = await addUserApi(formData);
    setLoading(false);

    if (!result.success) return result;

    setUsers((prev) => [...prev, result.user]);

    return result;
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 앱 시작 시 로그인 유지
  useEffect(() => {
    const init = async () => {
      const usersData = await fetchUsersApi(); // 🔥 API 사용
      setUsers(usersData);

      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(savedUser);
      }

      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        users: users,
        isLogin: !!user,
        loading: loading,
        login,
        logout,
        addUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
