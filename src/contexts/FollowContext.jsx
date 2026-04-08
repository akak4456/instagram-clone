// contexts/FollowContext.js
import { createContext, useState } from "react";
import { fetchFollowingUsersApi } from "../mocks/api";
import { useAuth } from "../hooks/useAuth";

export const FollowContext = createContext();

const PAGE_SIZE = 8;

export const FollowProvider = ({ children }) => {
  const { user } = useAuth();

  const [allFollowingUsers, setAllFollowingUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [page, setPage] = useState(0);

  const fetchFollowingUsers = async () => {
    if (!user) return;

    const result = await fetchFollowingUsersApi(user.userId);
    if (!result.success) return;

    // 테스트용 데이터 확장
    const expanded = Array(50).fill(result.users).flat();

    setAllFollowingUsers(expanded);
    setVisibleUsers(expanded.slice(0, PAGE_SIZE));
    setPage(0);
  };

  const nextPage = () => {
    const next = page + 1;
    const start = next * PAGE_SIZE;

    if (start >= allFollowingUsers.length) return;

    setVisibleUsers(allFollowingUsers.slice(start, start + PAGE_SIZE));
    setPage(next);
  };

  const prevPage = () => {
    const prev = page - 1;
    if (prev < 0) return;

    const start = prev * PAGE_SIZE;

    setVisibleUsers(allFollowingUsers.slice(start, start + PAGE_SIZE));
    setPage(prev);
  };

  return (
    <FollowContext.Provider
      value={{
        visibleUsers,
        fetchFollowingUsers,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
