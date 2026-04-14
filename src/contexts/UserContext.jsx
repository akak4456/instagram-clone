import { createContext, useEffect, useState } from "react";
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

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  const fetchUsers = async () => {
    setUserLoading(true);
    const data = await fetchUsersApi();
    setUsers(data);
    setUserLoading(false);
  };

  const addUser = async (formData) => {
    setUserLoading(true);
    const result = await addUserApi(formData);
    setUserLoading(false);

    if (!result.success) return result;

    setUsers((prev) => [...prev, result.user]);
    return result;
  };

  const searchUsers = async (keyword) => {
    setUserLoading(true);
    const result = await searchUsersApi(keyword);
    setUserLoading(false);
    return result;
  };

  const getUser = async (userId) => {
    setUserLoading(true);
    const result = await getUserApi(userId);
    setUserLoading(false);
    return result;
  };

  const getUserPosts = async (userId) => {
    setUserLoading(true);
    const result = await fetchUserPostsApi(userId);
    setUserLoading(false);
    return result;
  };

  const getUserReels = async (userId) => {
    setUserLoading(true);
    const result = await fetchUserReelsApi(userId);
    setUserLoading(false);
    return result;
  };

  const getUserSavedPosts = async (userId) => {
    setUserLoading(true);
    const result = await fetchUserSavedPostsApi(userId);
    setUserLoading(false);
    return result;
  };

  const getUserTaggedPosts = async (userId) => {
    setUserLoading(true);
    const result = await fetchUserTaggedPostsApi(userId);
    setUserLoading(false);
    return result;
  };

  const removeFollower = async ({ profileUserId, followerUserId }) => {
    setUserLoading(true);
    const result = await removeFollowerApi({ profileUserId, followerUserId });

    if (result.success) {
      const refreshedUsers = await fetchUsersApi();
      setUsers(refreshedUsers);
    }

    setUserLoading(false);
    return result;
  };

  const unfollowUser = async ({ profileUserId, targetUserId }) => {
    setUserLoading(true);
    const result = await unfollowUserApi({ profileUserId, targetUserId });

    if (result.success) {
      const refreshedUsers = await fetchUsersApi();
      setUsers(refreshedUsers);
    }

    setUserLoading(false);
    return result;
  };

  const followUser = async ({ currentUserId, targetUserId }) => {
    const result = await followUserApi({
      currentUserId,
      targetUserId,
    });

    if (result.success) {
      const refreshedUsers = await fetchUsersApi();
      setUsers(refreshedUsers);
    }

    return result;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        userLoading,
        addUser,
        fetchUsers,
        searchUsers,
        getUser,
        getUserPosts,
        getUserReels,
        getUserSavedPosts,
        getUserTaggedPosts,
        removeFollower,
        unfollowUser,
        followUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
