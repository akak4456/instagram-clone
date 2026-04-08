import { createContext, useContext, useEffect, useState } from "react";
import { users as initialUsers } from "../mocks/users";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 로그인
  const login = (formData) => {
    const { userId, password } = formData;

    // 1. 유저 찾기
    const foundUser = users.find((user) => user.userId === userId);

    // 2. 유저 없음
    if (!foundUser) {
      return {
        success: false,
        message: "입력하신 로그인 정보가 잘못되었습니다.",
      };
    }

    // 3. 비밀번호 불일치
    if (foundUser.password !== password) {
      return {
        success: false,
        message: "입력하신 로그인 정보가 잘못되었습니다.",
      };
    }

    // 4. 로그인 성공 (비밀번호 제거)
    const { password: _, ...userWithoutPassword } = foundUser;

    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));

    return { success: true };
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 앱 시작 시 로그인 유지
  useEffect(() => {
    setUsers(initialUsers);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin: !!user,
        loading: loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
