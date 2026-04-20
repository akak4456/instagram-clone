import { createContext, useEffect, useMemo, useState } from "react";
import useUserLoading from "../hooks/user/useUserLoading";
import useUserQueries from "../hooks/user/useUserQueries";
import useUserRelations from "../hooks/user/useUserRelations";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const { loading, relationLoading, setLoadingByKey, setRelationLoadingByKey } =
    useUserLoading();

  const {
    fetchUsers,
    addUser,
    searchUsers,
    getUser,
    getProfilePosts,
    getProfileReels,
    getProfileSavedPosts,
    getProfileTaggedPosts,
    refreshUserList,
  } = useUserQueries({
    setUsers,
    setLoadingByKey,
  });

  const { removeFollowerAction, unfollowUserAction, followUserAction } =
    useUserRelations({
      refreshUserList,
      setRelationLoadingByKey,
    });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const isInitialLoading = loading.fetchUsers && users.length === 0;

  const value = useMemo(
    () => ({
      users,
      loading,
      relationLoading,
      isInitialLoading,
      fetchUsers,
      addUser,
      searchUsers,
      getUser,
      getUserPosts: getProfilePosts,
      getUserReels: getProfileReels,
      getUserSavedPosts: getProfileSavedPosts,
      getUserTaggedPosts: getProfileTaggedPosts,
      removeFollower: removeFollowerAction,
      unfollowUser: unfollowUserAction,
      followUser: followUserAction,
    }),
    [
      users,
      loading,
      relationLoading,
      isInitialLoading,
      fetchUsers,
      addUser,
      searchUsers,
      getUser,
      getProfilePosts,
      getProfileReels,
      getProfileSavedPosts,
      getProfileTaggedPosts,
      removeFollowerAction,
      unfollowUserAction,
      followUserAction,
    ],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
