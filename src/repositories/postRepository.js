import {
  fetchFeed,
  toggleLikeApi,
  toggleBookmarkApi,
  addPostApi,
} from "../mocks/api";

export const fetchFeedRepository = async ({ currentUserId, page, limit }) => {
  return await fetchFeed(currentUserId, page, limit);
};

export const toggleLikeRepository = async ({ postId, userId }) => {
  return await toggleLikeApi({ postId, userId });
};

export const toggleBookmarkRepository = async ({ postId, userId }) => {
  return await toggleBookmarkApi({ postId, userId });
};

export const addPostRepository = async ({ userId, images, caption }) => {
  return await addPostApi({ userId, images, caption });
};
