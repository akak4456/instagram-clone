import { createContext, useState } from "react";
import { fetchCommentsApi } from "../mocks/api";

export const ReplyContext = createContext();

export const ReplyProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [replyLoading, setReplyLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentPostId, setCurrentPostId] = useState(null);

  // 🔥 특정 post 댓글 초기화
  const initComments = (postId) => {
    setComments([]);
    setPage(1);
    setHasMore(true);
    setCurrentPostId(postId);
  };

  const loadComments = async () => {
    if (!currentPostId || replyLoading || !hasMore) return;

    setReplyLoading(true);

    const data = await fetchCommentsApi(currentPostId, page, 10);

    setComments((prev) => [...prev, ...data.comments]);
    setHasMore(data.hasMore);
    setPage((prev) => prev + 1);

    setReplyLoading(false);
  };

  return (
    <ReplyContext.Provider
      value={{
        comments,
        replyLoading,
        hasMore,
        loadComments,
        initComments, // 🔥 핵심
      }}
    >
      {children}
    </ReplyContext.Provider>
  );
};
