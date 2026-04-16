import { createContext, useCallback, useMemo, useState } from "react";
import {
  getComments,
  likeComment,
  createComment,
} from "../services/replyService";

export const ReplyContext = createContext(null);

export const ReplyProvider = ({ children }) => {
  const [commentsMap, setCommentsMap] = useState({});
  const [pageMap, setPageMap] = useState({});
  const [hasMoreMap, setHasMoreMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});

  const resetComments = useCallback((postId) => {
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [],
    }));

    setPageMap((prev) => ({
      ...prev,
      [postId]: 1,
    }));

    setHasMoreMap((prev) => ({
      ...prev,
      [postId]: true,
    }));

    setLoadingMap((prev) => ({
      ...prev,
      [postId]: false,
    }));
  }, []);

  const initComments = useCallback(async (postId) => {
    if (!postId) return;

    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [],
    }));

    setPageMap((prev) => ({
      ...prev,
      [postId]: 1,
    }));

    setHasMoreMap((prev) => ({
      ...prev,
      [postId]: true,
    }));

    setLoadingMap((prev) => ({
      ...prev,
      [postId]: true,
    }));

    try {
      const data = await getComments({
        postId,
        page: 1,
        limit: 10,
      });

      setCommentsMap((prev) => ({
        ...prev,
        [postId]: data.comments,
      }));

      setHasMoreMap((prev) => ({
        ...prev,
        [postId]: data.hasMore,
      }));

      setPageMap((prev) => ({
        ...prev,
        [postId]: 2,
      }));
    } catch (error) {
      console.error("댓글 초기 로드 실패:", error);

      setCommentsMap((prev) => ({
        ...prev,
        [postId]: [],
      }));
    } finally {
      setLoadingMap((prev) => ({
        ...prev,
        [postId]: false,
      }));
    }
  }, []);

  const loadComments = useCallback(
    async (postId) => {
      if (!postId) return;

      const page = pageMap[postId] || 1;
      const hasMore = hasMoreMap[postId] ?? true;
      const loading = loadingMap[postId] ?? false;

      if (loading || !hasMore) return;

      setLoadingMap((prev) => ({
        ...prev,
        [postId]: true,
      }));

      try {
        const data = await getComments({
          postId,
          page,
          limit: 10,
        });

        setCommentsMap((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), ...data.comments],
        }));

        setHasMoreMap((prev) => ({
          ...prev,
          [postId]: data.hasMore,
        }));

        setPageMap((prev) => ({
          ...prev,
          [postId]: page + 1,
        }));
      } catch (error) {
        console.error("댓글 추가 로드 실패:", error);
      } finally {
        setLoadingMap((prev) => ({
          ...prev,
          [postId]: false,
        }));
      }
    },
    [pageMap, hasMoreMap, loadingMap],
  );

  const toggleReplyLike = useCallback(async (postId, commentId, userId) => {
    if (!postId || !commentId || !userId) return;

    let rollbackComments = null;

    setCommentsMap((prev) => {
      rollbackComments = prev[postId] || [];

      const updatedComments = (prev[postId] || []).map((comment) => {
        if (comment.id !== commentId) return comment;

        const likes = comment.likes || [];
        const alreadyLiked = likes.some((like) => like.userId === userId);

        return {
          ...comment,
          likes: alreadyLiked
            ? likes.filter((like) => like.userId !== userId)
            : [...likes, { commentId, userId }],
        };
      });

      return {
        ...prev,
        [postId]: updatedComments,
      };
    });

    try {
      await likeComment({ commentId, userId });
    } catch (error) {
      console.error("댓글 좋아요 실패:", error);

      setCommentsMap((prev) => ({
        ...prev,
        [postId]: rollbackComments || [],
      }));
    }
  }, []);

  const addComment = useCallback(async ({ postId, user, content }) => {
    if (!postId || !user?.userId || !content?.trim()) {
      return {
        success: false,
        message: "댓글 작성에 필요한 값이 부족합니다.",
      };
    }

    const tempComment = {
      id: Date.now(),
      postId,
      userId: user.userId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      user,
      likes: [],
    };

    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [tempComment, ...(prev[postId] || [])],
    }));

    try {
      const response = await createComment({
        postId,
        userId: user.userId,
        content,
      });

      const savedComment = response?.comment ?? response;

      console.log(savedComment);

      setCommentsMap((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).map((comment) =>
          comment.id === tempComment.id
            ? {
                ...savedComment,
                user,
                likes: [],
              }
            : comment,
        ),
      }));

      return {
        success: true,
        comment: savedComment,
      };
    } catch (error) {
      console.error("댓글 작성 실패:", error);

      setCommentsMap((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).filter(
          (comment) => comment.id !== tempComment.id,
        ),
      }));

      return {
        success: false,
        message: error.message || "댓글 작성에 실패했습니다.",
      };
    }
  }, []);

  const value = useMemo(
    () => ({
      commentsMap,
      pageMap,
      hasMoreMap,
      loadingMap,
      initComments,
      loadComments,
      resetComments,
      toggleReplyLike,
      addComment,
    }),
    [
      commentsMap,
      pageMap,
      hasMoreMap,
      loadingMap,
      initComments,
      loadComments,
      resetComments,
      toggleReplyLike,
      addComment,
    ],
  );

  return (
    <ReplyContext.Provider value={value}>{children}</ReplyContext.Provider>
  );
};
