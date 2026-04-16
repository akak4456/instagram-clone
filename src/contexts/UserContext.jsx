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

const initialLoading = {
  fetchUsers: false,
  addUser: false,
  searchUsers: false,
  getUser: false,
  getUserPosts: false,
  getUserReels: false,
  getUserSavedPosts: false,
  getUserTaggedPosts: false,
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(initialLoading);
  const [relationLoading, setRelationLoading] = useState({});

  const setLoadingByKey = useCallback((key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setRelationLoadingByKey = useCallback((key, value) => {
    setRelationLoading((prev) => ({ ...prev, [key]: value }));
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoadingByKey("fetchUsers", true);

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
      setLoadingByKey("fetchUsers", false);
    }
  }, [setLoadingByKey]);

  const addUser = useCallback(
    async (formData) => {
      setLoadingByKey("addUser", true);

      try {
        const result = await createUser(formData);

        if (!result.success) return result;

        setUsers((prev) => [...prev, result.user]);
        return result;
      } catch (error) {
        console.error("회원가입 실패:", error);
        return {
          success: false,
          message: "회원가입 중 오류가 발생했습니다.",
        };
      } finally {
        setLoadingByKey("addUser", false);
      }
    },
    [setLoadingByKey],
  );

  const searchUsers = useCallback(
    async (keyword) => {
      setLoadingByKey("searchUsers", true);

      try {
        return await findUsers(keyword);
      } catch (error) {
        console.error("유저 검색 실패:", error);
        return [];
      } finally {
        setLoadingByKey("searchUsers", false);
      }
    },
    [setLoadingByKey],
  );

  const getUser = useCallback(
    async (userId) => {
      setLoadingByKey("getUser", true);

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
        setLoadingByKey("getUser", false);
      }
    },
    [setLoadingByKey],
  );

  const getProfilePosts = useCallback(
    async (userId) => {
      setLoadingByKey("getUserPosts", true);

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
        setLoadingByKey("getUserPosts", false);
      }
    },
    [setLoadingByKey],
  );

  const getProfileReels = useCallback(
    async (userId) => {
      setLoadingByKey("getUserReels", true);

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
        setLoadingByKey("getUserReels", false);
      }
    },
    [setLoadingByKey],
  );

  const getProfileSavedPosts = useCallback(
    async (userId) => {
      setLoadingByKey("getUserSavedPosts", true);

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
        setLoadingByKey("getUserSavedPosts", false);
      }
    },
    [setLoadingByKey],
  );

  const getProfileTaggedPosts = useCallback(
    async (userId) => {
      setLoadingByKey("getUserTaggedPosts", true);

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
        setLoadingByKey("getUserTaggedPosts", false);
      }
    },
    [setLoadingByKey],
  );

  const refreshUserList = useCallback(async () => {
    const refreshedUsers = await refreshUsers();
    setUsers(refreshedUsers);
    return refreshedUsers;
  }, []);

  const removeFollowerAction = useCallback(
    async ({ profileUserId, followerUserId }) => {
      const loadingKey = `removeFollower:${followerUserId}`;
      setRelationLoadingByKey(loadingKey, true);

      try {
        const result = await removeFollower({ profileUserId, followerUserId });

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
        setRelationLoadingByKey(loadingKey, false);
      }
    },
    [refreshUserList, setRelationLoadingByKey],
  );

  const unfollowUserAction = useCallback(
    async ({ profileUserId, targetUserId }) => {
      const loadingKey = `unfollow:${targetUserId}`;
      setRelationLoadingByKey(loadingKey, true);

      try {
        const result = await unfollowUser({ profileUserId, targetUserId });

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
        setRelationLoadingByKey(loadingKey, false);
      }
    },
    [refreshUserList, setRelationLoadingByKey],
  );

  const followUserAction = useCallback(
    async ({ currentUserId, targetUserId }) => {
      const loadingKey = `follow:${targetUserId}`;
      setRelationLoadingByKey(loadingKey, true);

      try {
        const result = await followUser({ currentUserId, targetUserId });

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
        setRelationLoadingByKey(loadingKey, false);
      }
    },
    [refreshUserList, setRelationLoadingByKey],
  );

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
