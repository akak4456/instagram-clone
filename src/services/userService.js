import {
  fetchUsersRepository,
  addUserRepository,
  searchUsersRepository,
  getUserRepository,
  fetchUserPostsRepository,
  fetchUserReelsRepository,
  fetchUserSavedPostsRepository,
  fetchUserTaggedPostsRepository,
  removeFollowerRepository,
  unfollowUserRepository,
  followUserRepository,
} from "../repositories/userRepository";

export const getUsers = async () => {
  const users = await fetchUsersRepository();

  return {
    success: true,
    users: users ?? [],
  };
};

export const createUser = async (formData) => {
  return await addUserRepository(formData);
};

export const findUsers = async (keyword) => {
  if (!keyword?.trim()) {
    return [];
  }

  return await searchUsersRepository(keyword.trim());
};

export const getUserProfile = async (userId) => {
  if (!userId) {
    return {
      success: false,
      message: "userId가 필요합니다.",
      user: null,
    };
  }

  return await getUserRepository(userId);
};

export const getUserPosts = async (userId) => {
  if (!userId) {
    return {
      success: false,
      message: "userId가 필요합니다.",
      posts: [],
    };
  }

  return await fetchUserPostsRepository(userId);
};

export const getUserReels = async (userId) => {
  if (!userId) {
    return {
      success: false,
      message: "userId가 필요합니다.",
      reels: [],
    };
  }

  return await fetchUserReelsRepository(userId);
};

export const getUserSavedPosts = async (userId) => {
  if (!userId) {
    return {
      success: false,
      message: "userId가 필요합니다.",
      posts: [],
    };
  }

  return await fetchUserSavedPostsRepository(userId);
};

export const getUserTaggedPosts = async (userId) => {
  if (!userId) {
    return {
      success: false,
      message: "userId가 필요합니다.",
      posts: [],
    };
  }

  return await fetchUserTaggedPostsRepository(userId);
};

export const removeFollower = async ({ profileUserId, followerUserId }) => {
  if (!profileUserId || !followerUserId) {
    return {
      success: false,
      message: "필수 값이 부족합니다.",
    };
  }

  return await removeFollowerRepository({ profileUserId, followerUserId });
};

export const unfollowUser = async ({ profileUserId, targetUserId }) => {
  if (!profileUserId || !targetUserId) {
    return {
      success: false,
      message: "필수 값이 부족합니다.",
    };
  }

  return await unfollowUserRepository({ profileUserId, targetUserId });
};

export const followUser = async ({ currentUserId, targetUserId }) => {
  if (!currentUserId || !targetUserId) {
    return {
      success: false,
      message: "필수 값이 부족합니다.",
    };
  }

  return await followUserRepository({ currentUserId, targetUserId });
};

export const refreshUsers = async () => {
  const users = await fetchUsersRepository();

  return users ?? [];
};
