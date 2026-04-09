import { createContext, useState } from "react";
import {
  fetchCommentsApi,
  toggleCommentLikeApi,
  addCommentApi,
} from "../mocks/api";
import { useUser } from "../hooks/useUser";
export const ReplyContext = createContext();

export const ReplyProvider = ({ children }) => {
  const { users } = useUser();
  const [commentsMap, setCommentsMap] = useState({});
  const [pageMap, setPageMap] = useState({});
  const [hasMoreMap, setHasMoreMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});

  // 🔥 댓글 초기화 (postId 기준)
  const initComments = async (postId) => {
    const page = pageMap[postId] || 1;
    if (page === 1) {
      // 상태 초기화
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

      // 🔥 바로 첫 페이지 로딩
      const data = await fetchCommentsApi(postId, 1, 10);

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

      setLoadingMap((prev) => ({
        ...prev,
        [postId]: false,
      }));
    }
  };

  const loadComments = async (postId) => {
    const page = pageMap[postId] || 1;
    const hasMore = hasMoreMap[postId] ?? true;
    const loading = loadingMap[postId] ?? false;

    if (loading || !hasMore) return;

    // 🔥 로딩 상태 설정
    setLoadingMap((prev) => ({
      ...prev,
      [postId]: true,
    }));

    const data = await fetchCommentsApi(postId, page, 10);

    // 🔥 댓글 추가
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), ...data.comments],
    }));

    // 🔥 hasMore 갱신
    setHasMoreMap((prev) => ({
      ...prev,
      [postId]: data.hasMore,
    }));

    // 🔥 page 증가
    setPageMap((prev) => ({
      ...prev,
      [postId]: page + 1,
    }));

    // 🔥 로딩 해제
    setLoadingMap((prev) => ({
      ...prev,
      [postId]: false,
    }));
  };

  const toggleReplyLike = async (postId, commentId, userId) => {
    // 🔥 optimistic update
    setCommentsMap((prev) => {
      const updated = prev[postId].map((comment) => {
        if (comment.id !== commentId) return comment;

        const alreadyLiked = comment.likes.some((l) => l.userId === userId);

        return {
          ...comment,
          likes: alreadyLiked
            ? comment.likes.filter((l) => l.userId !== userId)
            : [...comment.likes, { userId }],
        };
      });

      return {
        ...prev,
        [postId]: updated,
      };
    });

    // 🔥 서버 반영
    await toggleCommentLikeApi({ commentId, userId });
  };

  const addComment = async (postId, userId, content) => {
    const tempComment = {
      id: Date.now(),
      postId,
      userId,
      content,
      createdAt: new Date().toISOString(),
      user: users.find((u) => u.userId === userId), // ⚠️ 필요 시
      likes: [],
    };

    // 🔥 optimistic update (UI 먼저 반영)
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [tempComment, ...(prev[postId] || [])],
    }));

    try {
      const res = await addCommentApi({ postId, userId, content });

      // 🔥 서버 응답으로 교체 (선택)
      setCommentsMap((prev) => ({
        ...prev,
        [postId]: prev[postId].map((c) =>
          c.id === tempComment.id
            ? { ...res.comment, user: tempComment.user, likes: [] }
            : c,
        ),
      }));
    } catch (e) {
      // 🔥 실패 시 롤백
      setCommentsMap((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((c) => c.id !== tempComment.id),
      }));
    }
  };

  return (
    <ReplyContext.Provider
      value={{
        commentsMap,
        pageMap,
        hasMoreMap,
        loadingMap,
        loadComments,
        initComments,
        toggleReplyLike,
        addComment,
      }}
    >
      {children}
    </ReplyContext.Provider>
  );
};
