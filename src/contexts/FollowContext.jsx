import { createContext, useCallback, useMemo, useState } from "react";
import { getFollowingUsers } from "../services/followService";

export const FollowContext = createContext(null);

const PAGE_SIZE = 9;

export const FollowProvider = ({ children }) => {
  const [allFollowingUsers, setAllFollowingUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [followingLoading, setFollowingLoading] = useState(false);

  const fetchFollowingUsers = useCallback(async (userId) => {
    if (!userId) {
      setAllFollowingUsers([]);
      setPage(0);
      return {
        success: false,
        message: "userId가 필요합니다.",
      };
    }

    setFollowingLoading(true);

    try {
      const result = await getFollowingUsers(userId);

      if (!result.success) {
        return result;
      }

      setAllFollowingUsers(result.users);
      setPage(0);

      return {
        success: true,
        users: result.users,
      };
    } catch (error) {
      console.error("팔로잉 목록 조회 실패:", error);

      return {
        success: false,
        message: "팔로잉 목록 조회 중 오류가 발생했습니다.",
      };
    } finally {
      setFollowingLoading(false);
    }
  }, []);

  const resetFollowingUsers = useCallback(() => {
    setAllFollowingUsers([]);
    setPage(0);
  }, []);

  const maxPage = Math.ceil(allFollowingUsers.length / PAGE_SIZE);

  const nextPage = useCallback(() => {
    setPage((prev) => {
      const next = prev + 1;
      if (next >= maxPage) return prev;
      return next;
    });
  }, [maxPage]);

  const prevPage = useCallback(() => {
    setPage((prev) => {
      const next = prev - 1;
      if (next < 0) return prev;
      return next;
    });
  }, []);

  const currentPageUsers = useMemo(() => {
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return allFollowingUsers.slice(start, end);
  }, [allFollowingUsers, page]);

  const value = useMemo(
    () => ({
      allFollowingUsers,
      currentPageUsers,
      page,
      PAGE_SIZE,
      followingLoading,
      maxPage,
      fetchFollowingUsers,
      resetFollowingUsers,
      nextPage,
      prevPage,
    }),
    [
      allFollowingUsers,
      currentPageUsers,
      page,
      followingLoading,
      maxPage,
      fetchFollowingUsers,
      resetFollowingUsers,
      nextPage,
      prevPage,
    ],
  );

  return (
    <FollowContext.Provider value={value}>{children}</FollowContext.Provider>
  );
};
