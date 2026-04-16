import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getUsers,
  createUser,
  findUsers,
  getUserProfile,
  getUserPosts,
  getUserReels,
  getUserSavedPosts,
  getUserTaggedPosts,
  removeFollower,
  unfollowUser,
  followUser,
  refreshUsers,
} from "../services/userService";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setUserLoading(true);

    try {
      const result = await getUsers();
      setUsers(result.users);

      return result;
    } catch (error) {
      console.error("유저 목록 조회 실패:", error);

      return {
        success: false,
        message: "유저 목록을 불러오는 중 오류가 발생했습니다.",
        users: [],
      };
    } finally {
      setUserLoading(false);
    }
  }, []);

  const addUser = useCallback(async (formData) => {
    setUserLoading(true);

    try {
      const result = await createUser(formData);

      if (!result.success) {
        return result;
      }

      setUsers((prev) => [...prev, result.user]);

      return result;
    } catch (error) {
      console.error("회원가입 실패:", error);

      return {
        success: false,
        message: "회원가입 중 오류가 발생했습니다.",
      };
    } finally {
      setUserLoading(false);
    }
  }, []);

  const searchUsers = useCallback(async (keyword) => {
    setUserLoading(true);

    try {
      return await findUsers(keyword);
    } catch (error) {
      console.error("유저 검색 실패:", error);
      return [];
    } finally {
      setUserLoading(false);
    }
  }, []);

  const getUser = useCallback(async (userId) => {
    setUserLoading(true);

    try {
      return await getUserProfile(userId);
    } catch (error) {
      console.error("유저 조회 실패:", error);

      return {
        success: false,
        message: "유저 조회 중 오류가 발생했습니다.",
        user: null,
      };
    } finally {
      setUserLoading(false);
    }
  }, []);

  const getProfilePosts = useCallback(async (userId) => {
    setUserLoading(true);

    try {
      return await getUserPosts(userId);
    } catch (error) {
      console.error("유저 게시물 조회 실패:", error);

      return {
        success: false,
        message: "게시물 조회 중 오류가 발생했습니다.",
        posts: [],
      };
    } finally {
      setUserLoading(false);
    }
  }, []);

  const getProfileReels = useCallback(async (userId) => {
    setUserLoading(true);

    try {
      return await getUserReels(userId);
    } catch (error) {
      console.error("유저 릴스 조회 실패:", error);

      return {
        success: false,
        message: "릴스 조회 중 오류가 발생했습니다.",
        reels: [],
      };
    } finally {
      setUserLoading(false);
    }
  }, []);

  const getProfileSavedPosts = useCallback(async (userId) => {
    setUserLoading(true);

    try {
      return await getUserSavedPosts(userId);
    } catch (error) {
      console.error("저장된 게시물 조회 실패:", error);

      return {
        success: false,
        message: "저장된 게시물 조회 중 오류가 발생했습니다.",
        posts: [],
      };
    } finally {
      setUserLoading(false);
    }
  }, []);

  const getProfileTaggedPosts = useCallback(async (userId) => {
    setUserLoading(true);

    try {
      return await getUserTaggedPosts(userId);
    } catch (error) {
      console.error("태그된 게시물 조회 실패:", error);

      return {
        success: false,
        message: "태그된 게시물 조회 중 오류가 발생했습니다.",
        posts: [],
      };
    } finally {
      setUserLoading(false);
    }
  }, []);

  const refreshUserList = useCallback(async () => {
    const refreshedUsers = await refreshUsers();
    setUsers(refreshedUsers);
    return refreshedUsers;
  }, []);

  const removeFollowerAction = useCallback(
    async ({ profileUserId, followerUserId }) => {
      setUserLoading(true);
      try {
        const result = await removeFollower({
          profileUserId,
          followerUserId,
        });

        if (result.success) {
          await refreshUserList();
        }

        return result;
      } catch (error) {
        console.error("팔로워 제거 실패:", error);

        return {
          success: false,
          message: "팔로워 제거 중 오류가 발생했습니다.",
        };
      } finally {
        setUserLoading(false);
      }
    },
    [refreshUserList],
  );

  const unfollowUserAction = useCallback(
    async ({ profileUserId, targetUserId }) => {
      setUserLoading(true);

      try {
        const result = await unfollowUser({
          profileUserId,
          targetUserId,
        });

        if (result.success) {
          await refreshUserList();
        }

        return result;
      } catch (error) {
        console.error("언팔로우 실패:", error);

        return {
          success: false,
          message: "언팔로우 중 오류가 발생했습니다.",
        };
      } finally {
        setUserLoading(false);
      }
    },
    [refreshUserList],
  );

  const followUserAction = useCallback(
    async ({ currentUserId, targetUserId }) => {
      setUserLoading(true);

      try {
        const result = await followUser({
          currentUserId,
          targetUserId,
        });

        if (result.success) {
          await refreshUserList();
        }

        return result;
      } catch (error) {
        console.error("팔로우 실패:", error);

        return {
          success: false,
          message: "팔로우 처리 중 오류가 발생했습니다.",
        };
      } finally {
        setUserLoading(false);
      }
    },
    [refreshUserList],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const value = useMemo(
    () => ({
      users,
      userLoading,
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
      userLoading,
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
