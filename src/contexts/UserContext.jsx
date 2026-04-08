// contexts/UserContext.js
import { createContext, useEffect, useState } from "react";
import { fetchUsersApi, addUserApi } from "../mocks/api";

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
