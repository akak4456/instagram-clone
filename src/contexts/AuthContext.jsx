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

  const addUser = (newUser) => {
    const { userId, username } = newUser;

    // 1️⃣ userId 중복 체크
    const existsUserId = users.some((u) => u.userId === userId);
    if (existsUserId) {
      return {
        success: false,
        message: "이미 사용 중인 휴대폰 번호 또는 이메일입니다.",
      };
    }

    // 2️⃣ username 중복 체크 (선택 but 보통 필요)
    const existsUsername = users.some((u) => u.username === username);
    if (existsUsername) {
      return {
        success: false,
        message: "이미 사용 중인 사용자 이름입니다.",
      };
    }

    // 3️⃣ 유저 추가
    const newUserData = {
      ...newUser,
      profileImage: "",
      bio: "",
    };

    setUsers((prev) => [...prev, newUserData]);

    return {
      success: true,
      user: newUserData,
    };
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
