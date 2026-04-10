// contexts/FollowContext.js
import { createContext, useState } from "react";
import { fetchFollowingUsersApi } from "../mocks/api";
import { useAuth } from "../hooks/useAuth";

export const FollowContext = createContext();

const PAGE_SIZE = 9;

export const FollowProvider = ({ children }) => {
  const { user } = useAuth();

  const [allFollowingUsers, setAllFollowingUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [followingLoading, setFollowingLoading] = useState(false);

  // 🔥 데이터 가져오기
  const fetchFollowingUsers = async () => {
    if (!user) return;

    setFollowingLoading(true);

    const result = await fetchFollowingUsersApi(user.userId);

    setFollowingLoading(false);

    if (!result.success) return;

    setAllFollowingUsers(result.users);
    setPage(0);
  };

  // 👉 총 페이지 수
  const maxPage = Math.ceil(allFollowingUsers.length / PAGE_SIZE);

  // 👉 다음 페이지
  const nextPage = () => {
    setPage((prev) => {
      const next = prev + 1;
      if (next >= maxPage) return prev;
      return next;
    });
  };

  // 👉 이전 페이지
  const prevPage = () => {
    setPage((prev) => {
      const next = prev - 1;
      if (next < 0) return prev;
      return next;
    });
  };

  return (
    <FollowContext.Provider
      value={{
        allFollowingUsers, // 전체 리스트 (슬라이드용)
        page, // 현재 페이지
        PAGE_SIZE, // 페이지 사이즈
        followingLoading,
        maxPage,
        fetchFollowingUsers,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
