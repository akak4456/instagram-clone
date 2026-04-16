import { createContext, useCallback, useState, useRef, useMemo } from "react";
import {
  getFeedPosts,
  likePost,
  bookmarkPost,
  createPost,
} from "../services/postService";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);

  const resetPosts = useCallback(() => {
    setPostLoading(true);
    setPosts([]);
    setHasMore(true);
    pageRef.current = 1;
    setPostLoading(false);
  }, []);

  const loadPosts = useCallback(
    async (currentUserId) => {
      if (postLoading || !hasMore || !currentUserId) return;

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

        return {
          ...post,
          isBookmarked: !post.isBookmarked,
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

  const addPost = useCallback(async ({ user, images, caption }) => {
    try {
      const addedPost = await createPost({
        userId: user.userId,
        images,
        caption,
      });

      const newPost = {
        ...addedPost.post,
        likes: [],
        commentCount: 0,
        isBookmarked: false,
        user,
      };

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
      hasMore,
      loadPosts,
      resetPosts,
      toggleLike,
      increaseCommentCount,
      toggleBookmark,
      addPost,
    }),
    [
      posts,
      postLoading,
      hasMore,
      loadPosts,
      resetPosts,
      toggleLike,
      increaseCommentCount,
      toggleBookmark,
      addPost,
    ],
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
