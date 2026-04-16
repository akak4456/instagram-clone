import { fetchFollowingUsersRepository } from "../repositories/followRepository";

export const getFollowingUsers = async (userId) => {
  if (!userId) {
    return {
      success: false,
      message: "userId가 필요합니다.",
      users: [],
    };
  }

  const result = await fetchFollowingUsersRepository(userId);

  if (!result.success) {
    return {
      success: false,
      message: result.message || "팔로잉 목록을 불러오지 못했습니다.",
      users: [],
    };
  }

  return {
    success: true,
    users: result.users ?? [],
  };
};
