import { createContext, useEffect, useState } from "react";
import {
  fetchFeed,
  toggleLikeApi,
  toggleBookmarkApi,
  addPostApi,
} from "../mocks/api";

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

  const toggleLike = async (postId, userId) => {
    await toggleLikeApi({ postId, userId });

    // 🔥 UI 즉시 반영 (optimistic update)
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const isLiked = post.likes.some((l) => l.userId === userId);

        return {
          ...post,
          likes: isLiked
            ? post.likes.filter((l) => l.userId !== userId)
            : [...post.likes, { userId }],
        };
      }),
    );
  };

  const increaseCommentCount = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, commentCount: post.commentCount + 1 }
          : post,
      ),
    );
  };

  const toggleBookmark = async (postId) => {
    // 🔥 optimistic update
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post,
      ),
    );

    // 🔥 서버 반영
    await toggleBookmarkApi({ postId });
  };

  const addPost = async ({ user, images, caption }) => {
    const userId = user.userId;
    // 우선 UI에 바로 추가 (임시 id)
    const tempPost = {
      id: Date.now(),
      userId,
      images,
      caption,
      commentCount: 0,
      createdAt: new Date().toISOString(),
      user,
      likes: [],
      isBookmarked: false,
    };
    console.log(tempPost);
    setPosts((prev) => [tempPost, ...prev]);

    // 서버 호출
    const res = await addPostApi({ userId, images, caption });
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
        toggleLike,
        hasMore,
        increaseCommentCount,
        toggleBookmark,
        addPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
