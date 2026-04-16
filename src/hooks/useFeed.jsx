import { useEffect, useContext } from "react";
import { FeedContext } from "../contexts/FeedContext";

export const useFeed = (userId) => {
  const context = useContext(FeedContext);
  const { posts, loadPosts } = context;
  useEffect(() => {
    if (posts.length === 0) {
      loadPosts(userId);
    }
  }, []);
  return context;
};
