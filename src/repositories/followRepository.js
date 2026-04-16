import { fetchFollowingUsersApi } from "../mocks/api";

export const fetchFollowingUsersRepository = async (userId) => {
  return await fetchFollowingUsersApi(userId);
};
