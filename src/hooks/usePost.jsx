import { useEffect, useContext } from "react";
import { PostContext } from "../contexts/PostContext";

export const usePost = (userId) => {
  const context = useContext(PostContext);
  const { posts, loadPosts } = context;
  useEffect(() => {
    if (posts.length === 0) {
      loadPosts(userId);
    }
  }, []);
  return context;
};
