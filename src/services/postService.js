import {
  fetchFeedRepository,
  toggleLikeRepository,
  toggleBookmarkRepository,
  addPostRepository,
} from "../repositories/postRepository";

export const getFeedPosts = async ({ currentUserId, page, limit }) => {
  const response = await fetchFeedRepository({ currentUserId, page, limit });

  return {
    posts: response?.posts ?? [],
    hasMore: response?.hasMore ?? false,
  };
};

export const likePost = async ({ postId, userId }) => {
  if (!postId) {
    throw new Error("postId가 필요합니다.");
  }

  if (!userId) {
    throw new Error("userId가 필요합니다.");
  }

  return await toggleLikeRepository({ postId, userId });
};

export const bookmarkPost = async ({ postId, userId }) => {
  if (!postId) {
    throw new Error("postId가 필요합니다.");
  }

  if (!userId) {
    throw new Error("userId가 필요합니다.");
  }

  return await toggleBookmarkRepository({ postId, userId });
};

export const createPost = async ({ userId, images, caption }) => {
  if (!userId) {
    throw new Error("로그인 사용자 정보가 필요합니다.");
  }

  if (!images || images.length === 0) {
    throw new Error("최소 1개 이상의 이미지가 필요합니다.");
  }

  return await addPostRepository({
    userId,
    images,
    caption,
  });
};
