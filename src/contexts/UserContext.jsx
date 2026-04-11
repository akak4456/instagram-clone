// contexts/UserContext.js
import { createContext, useEffect, useState } from "react";
import { fetchUsersApi, addUserApi, searchUsersApi } from "../mocks/api";

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users: users,
        userLoading,
        addUser,
        fetchUsers,
        searchUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
