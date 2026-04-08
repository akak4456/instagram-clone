import { createContext, useContext, useEffect, useState } from "react";
import { fetchFeed } from "../mocks/api";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  const loadPosts = async () => {
    setPostLoading(true);
    const data = await fetchFeed();
    setPosts(data);
    setPostLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        postLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
