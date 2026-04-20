import { useCallback } from "react";
import {
  getUsers,
  createUser,
  findUsers,
  getUserProfile,
  getUserPosts,
  getUserReels,
  getUserSavedPosts,
  getUserTaggedPosts,
  refreshUsers,
} from "../../services/userService";

const useUserQueries = ({ setUsers, setLoadingByKey }) => {
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
  }, [setUsers, setLoadingByKey]);

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
    [setUsers, setLoadingByKey],
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
  }, [setUsers]);

  return {
    fetchUsers,
    addUser,
    searchUsers,
    getUser,
    getProfilePosts,
    getProfileReels,
    getProfileSavedPosts,
    getProfileTaggedPosts,
    refreshUserList,
  };
};

export default useUserQueries;
