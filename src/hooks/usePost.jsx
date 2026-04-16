import { useEffect, useContext } from "react";
import { PostContext } from "../contexts/PostContext";

export const usePost = (userId) => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("useFeed는 FeedProvider 내부에서 사용해야 합니다.");
  }
  if (!userId) {
    throw new Error("useFeed는 userId를 받아야 합니다");
  }
  const { posts, loadPosts } = context;
  useEffect(() => {
    if (posts.length === 0) {
      loadPosts(userId);
    }
  }, []);
  return context;
};
