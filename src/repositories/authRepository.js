import { loginApi } from "../mocks/api";

const AUTH_STORAGE_KEY = "user";

export const loginRepository = async (formData) => {
  return await loginApi(formData);
};

export const saveAuthUserRepository = (user) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

export const getSavedAuthUserRepository = () => {
  const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    console.error("저장된 사용자 정보 파싱 실패:", error);
    return null;
  }
};

export const clearAuthUserRepository = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
