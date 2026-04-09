import { createContext, useState } from "react";
import { fetchCommentsApi } from "../mocks/api";

export const ReplyContext = createContext();

export const ReplyProvider = ({ children }) => {
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

  return (
    <ReplyContext.Provider
      value={{
        commentsMap,
        pageMap,
        hasMoreMap,
        loadingMap,
        loadComments,
        initComments,
      }}
    >
      {children}
    </ReplyContext.Provider>
  );
};
