import { withDelay } from "../utils/delay";
import { state, syncUsers } from "../store/mockState";

export const loginApi = ({ userId, password }) => {
  return withDelay(() => {
    const foundUser = state.users.find((u) => u.userId === userId);

    if (!foundUser || foundUser.password !== password) {
      return {
        success: false,
        message: "입력하신 로그인 정보가 잘못되었습니다.",
      };
    }

    return {
      success: true,
      user: {
        userId: foundUser.userId,
        profileImage: foundUser.profileImage,
        username: foundUser.username,
      },
    };
  });
};

export const addUserApi = (newUser) => {
  return withDelay(() => {
    const existsUserId = state.users.some((u) => u.userId === newUser.userId);
    if (existsUserId) {
      return {
        success: false,
        message: "이미 사용 중인 휴대폰 번호 또는 이메일입니다.",
      };
    }

    const existsUsername = state.users.some(
      (u) => u.username === newUser.username,
    );
    if (existsUsername) {
      return {
        success: false,
        message: "이미 사용 중인 사용자 이름입니다.",
      };
    }

    const newUserData = {
      ...newUser,
      profileImage: "",
      bio: "",
      following: [],
    };

    state.users = [...state.users, newUserData];
    syncUsers();

    return {
      success: true,
      user: newUserData,
    };
  });
};
