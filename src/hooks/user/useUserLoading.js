import { useCallback, useState } from "react";

export const initialUserLoading = {
  fetchUsers: false,
  addUser: false,
  searchUsers: false,
  getUser: false,
  getUserPosts: false,
  getUserReels: false,
  getUserSavedPosts: false,
  getUserTaggedPosts: false,
};

const useUserLoading = () => {
  const [loading, setLoading] = useState(initialUserLoading);
  const [relationLoading, setRelationLoading] = useState({});

  const setLoadingByKey = useCallback((key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setRelationLoadingByKey = useCallback((key, value) => {
    setRelationLoading((prev) => ({ ...prev, [key]: value }));
  }, []);

  return {
    loading,
    relationLoading,
    setLoadingByKey,
    setRelationLoadingByKey,
  };
};

export default useUserLoading;
