import { createContext, useContext, useEffect, useState } from "react";
import { fetchFeed } from "../mocks/api";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    setLoading(true);
    const data = await fetchFeed();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // 좋아요 기능
  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post,
      ),
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        toggleLike,
        reload: loadPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// 커스텀 훅
export const usePost = () => useContext(PostContext);
