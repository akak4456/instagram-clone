import {
  loginRepository,
  saveAuthUserRepository,
  getSavedAuthUserRepository,
  clearAuthUserRepository,
} from "../repositories/authRepository";

export const loginUser = async ({ userId, password }) => {
  if (!userId?.trim()) {
    return {
      success: false,
      message: "아이디를 입력해주세요.",
    };
  }

  if (!password?.trim()) {
    return {
      success: false,
      message: "비밀번호를 입력해주세요.",
    };
  }

  const result = await loginRepository({
    userId: userId.trim(),
    password,
  });

  if (!result.success) {
    return result;
  }

  saveAuthUserRepository(result.user);

  return {
    success: true,
    user: result.user,
  };
};

export const logoutUser = () => {
  clearAuthUserRepository();
};

export const restoreUser = () => {
  return getSavedAuthUserRepository();
};
