import {
  fetchCommentsRepository,
  toggleCommentLikeRepository,
  addCommentRepository,
} from "../repositories/replyRepository";

export const getComments = async ({ postId, page, limit }) => {
  if (!postId) {
    throw new Error("postId가 필요합니다.");
  }

  const response = await fetchCommentsRepository({
    postId,
    page,
    limit,
  });

  return {
    comments: response?.comments ?? [],
    hasMore: response?.hasMore ?? false,
  };
};

export const likeComment = async ({ commentId, userId }) => {
  if (!commentId) {
    throw new Error("commentId가 필요합니다.");
  }

  if (!userId) {
    throw new Error("userId가 필요합니다.");
  }

  return await toggleCommentLikeRepository({ commentId, userId });
};

export const createComment = async ({ postId, userId, content }) => {
  if (!postId) {
    throw new Error("postId가 필요합니다.");
  }

  if (!userId) {
    throw new Error("userId가 필요합니다.");
  }

  if (!content || !content.trim()) {
    throw new Error("댓글 내용을 입력해주세요.");
  }

  return await addCommentRepository({
    postId,
    userId,
    content: content.trim(),
  });
};
