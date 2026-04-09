import { useContext } from "react";
import { ReplyContext } from "../contexts/ReplyContext";

export const useReply = (postId) => {
  const {
    commentsMap,
    hasMoreMap,
    loadingMap,
    loadComments,
    initComments,
    toggleReplyLike,
    addComment,
  } = useContext(ReplyContext);

  return {
    comments: commentsMap[postId] || [],
    hasMore: hasMoreMap[postId] ?? true,
    replyLoading: loadingMap[postId] ?? false,
    loadComments,
    initComments,
    toggleReplyLike,
    addComment,
  };
};
