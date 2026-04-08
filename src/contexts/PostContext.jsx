import { createContext, useContext, useEffect, useState } from "react";
import { fetchFeed } from "../mocks/api";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async () => {
    if (!hasMore || postLoading) return;

    setPostLoading(true);

    const data = await fetchFeed(page, 10);
    console.log(data.posts);

    setPosts((prev) => [...prev, ...data.posts]); // 🔥 핵심
    setHasMore(data.hasMore);
    setPage((prev) => prev + 1);

    setPostLoading(false);
  };

  useEffect(() => {
    loadPosts(); // 첫 로딩
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        postLoading,
        loadPosts, // 🔥 추가
        hasMore,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
