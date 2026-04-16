import {
  fetchUsersApi,
  addUserApi,
  searchUsersApi,
  getUserApi,
  fetchUserPostsApi,
  fetchUserReelsApi,
  fetchUserSavedPostsApi,
  fetchUserTaggedPostsApi,
  removeFollowerApi,
  unfollowUserApi,
  followUserApi,
} from "../mocks/api";

export const fetchUsersRepository = async () => {
  return await fetchUsersApi();
};

export const addUserRepository = async (formData) => {
  return await addUserApi(formData);
};

export const searchUsersRepository = async (keyword) => {
  return await searchUsersApi(keyword);
};

export const getUserRepository = async (userId) => {
  return await getUserApi(userId);
};

export const fetchUserPostsRepository = async (userId) => {
  return await fetchUserPostsApi(userId);
};

export const fetchUserReelsRepository = async (userId) => {
  return await fetchUserReelsApi(userId);
};

export const fetchUserSavedPostsRepository = async (userId) => {
  return await fetchUserSavedPostsApi(userId);
};

export const fetchUserTaggedPostsRepository = async (userId) => {
  return await fetchUserTaggedPostsApi(userId);
};

export const removeFollowerRepository = async ({
  profileUserId,
  followerUserId,
}) => {
  return await removeFollowerApi({ profileUserId, followerUserId });
};

export const unfollowUserRepository = async ({
  profileUserId,
  targetUserId,
}) => {
  return await unfollowUserApi({ profileUserId, targetUserId });
};

export const followUserRepository = async ({ currentUserId, targetUserId }) => {
  return await followUserApi({ currentUserId, targetUserId });
};
