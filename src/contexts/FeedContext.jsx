import { createContext, useCallback, useState, useRef, useMemo } from "react";
import {
  getFeedPosts,
  likePost,
  bookmarkPost,
  createPost,
} from "../services/postService";

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 🔥 page를 useRef로 관리
  // 이유:
  // 1. useState는 비동기적으로 업데이트되기 때문에 setPage 후 즉시 값을 사용할 수 없음
  // 2. useRef는 current 값이 동기적으로 즉시 변경되어 pagination 로직에 적합함
  // 3. page 값은 UI에 직접 사용되지 않으므로 리렌더링이 필요하지 않음
  const pageRef = useRef(1);

  const loadPosts = useCallback(
    async (currentUserId) => {
      if (postLoading || !hasMore) return;

      setPostLoading(true);

      try {
        const data = await getFeedPosts({
          currentUserId,
          page: pageRef.current,
          limit: 10,
        });

        setPosts((prev) => [...prev, ...data.posts]);
        setHasMore(data.hasMore);
        pageRef.current += 1;
      } catch (error) {
        console.error("게시물 로드 실패:", error);
      } finally {
        setPostLoading(false);
      }
    },
    [postLoading, hasMore],
  );

  const toggleLike = useCallback(async (postId, userId) => {
    if (!postId || !userId) return;

    let rollbackPosts = null;

    setPosts((prev) => {
      rollbackPosts = prev;

      return prev.map((post) => {
        if (post.id !== postId) return post;

        const likes = post.likes || [];
        const isLiked = likes.some((like) => like.userId === userId);

        return {
          ...post,
          likes: isLiked
            ? likes.filter((like) => like.userId !== userId)
            : [...likes, { postId, userId }],
        };
      });
    });

    try {
      await likePost({ postId, userId });
    } catch (error) {
      console.error("좋아요 실패:", error);

      if (rollbackPosts) {
        setPosts(rollbackPosts);
      }
    }
  }, []);

  const increaseCommentCount = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, commentCount: post.commentCount + 1 }
          : post,
      ),
    );
  }, []);

  const toggleBookmark = useCallback(async (postId, userId) => {
    if (!postId || !userId) return;

    let rollbackPosts = null;

    setPosts((prev) => {
      rollbackPosts = prev;

      return prev.map((post) => {
        if (post.id !== postId) return post;

        const isBookmarked = !post.isBookmarked;

        return {
          ...post,
          isBookmarked,
        };
      });
    });

    try {
      await bookmarkPost({ postId, userId });
    } catch (error) {
      console.error("북마크 실패:", error);

      if (rollbackPosts) {
        setPosts(rollbackPosts);
      }
    }
  }, []);

  const addPost = useCallback(async ({ userId, images, caption }) => {
    try {
      const newPost = await createPost({
        userId,
        images,
        caption,
      });

      setPosts((prev) => [newPost, ...prev]);

      return {
        success: true,
        post: newPost,
      };
    } catch (error) {
      console.error("게시물 업로드 실패:", error);

      return {
        success: false,
        message: error.message || "게시물 업로드에 실패했습니다.",
      };
    }
  }, []);

  const value = useMemo(
    () => ({
      posts,
      postLoading,
      loadPosts,
      toggleLike,
      hasMore,
      increaseCommentCount,
      toggleBookmark,
      addPost,
    }),
    [
      posts,
      postLoading,
      loadPosts,
      toggleLike,
      hasMore,
      increaseCommentCount,
      toggleBookmark,
      addPost,
    ],
  );

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};
