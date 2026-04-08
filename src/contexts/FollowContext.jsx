// contexts/FollowContext.js
import { createContext, useState } from "react";
import { fetchFollowingUsersApi } from "../mocks/api";
import { useAuth } from "../hooks/useAuth";

export const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const { user } = useAuth();

  const [followingUsers, setFollowingUsers] = useState([]);
  const [followingLoading, setFollowingLoading] = useState(false);

  const fetchFollowingUsers = async () => {
    if (!user) return;

    setFollowingLoading(true);
    const result = await fetchFollowingUsersApi(user.userId);
    setFollowingLoading(false);

    if (!result.success) return;

    setFollowingUsers(result.users);
  };

  return (
    <FollowContext.Provider
      value={{
        followingUsers,
        followingLoading,
        fetchFollowingUsers,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
