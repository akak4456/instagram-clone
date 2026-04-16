import { useEffect, useContext } from "react";
import { FeedContext } from "../contexts/FeedContext";

export const useFeed = (userId) => {
  const context = useContext(FeedContext);
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
