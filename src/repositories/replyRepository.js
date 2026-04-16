import {
  fetchCommentsApi,
  toggleCommentLikeApi,
  addCommentApi,
} from "../mocks/api";

export const fetchCommentsRepository = async ({ postId, page, limit }) => {
  return await fetchCommentsApi(postId, page, limit);
};

export const toggleCommentLikeRepository = async ({ commentId, userId }) => {
  return await toggleCommentLikeApi({ commentId, userId });
};

export const addCommentRepository = async ({ postId, userId, content }) => {
  return await addCommentApi({ postId, userId, content });
};
