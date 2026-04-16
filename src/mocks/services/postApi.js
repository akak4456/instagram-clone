import { withDelay } from "../utils/delay";
import { createId } from "../utils/id";
import { sortByCreatedAtDesc } from "../utils/sort";
import { state, syncPosts, syncLikes, syncBookmarks } from "../store/mockState";

const getFeedPosts = (currentUserId) => {
  return state.posts.map((post) => {
    const user = state.users.find((u) => u.userId === post.userId);
    const likes = state.likes.filter((l) => l.postId === post.id);
    const commentCount = state.comments.filter(
      (c) => c.postId === post.id,
    ).length;
    const isBookmarked = state.bookmarks.some(
      (bookmark) =>
        bookmark.postId === post.id && bookmark.userId === currentUserId,
    );

    return {
      ...post,
      user,
      likes,
      commentCount,
      isBookmarked,
    };
  });
};

export const fetchFeed = (currentUserId, page = 1, limit = 10) => {
  return withDelay(() => {
    const allPosts = sortByCreatedAtDesc(getFeedPosts(currentUserId));

    const start = (page - 1) * limit;
    const end = start + limit;
    const pagedPosts = allPosts.slice(start, end);

    return {
      posts: pagedPosts,
      hasMore: end < allPosts.length,
    };
  });
};

export const toggleLikeApi = ({ postId, userId }) => {
  return withDelay(() => {
    const existing = state.likes.find(
      (l) => l.postId === postId && l.userId === userId,
    );

    if (existing) {
      state.likes = state.likes.filter(
        (l) => !(l.postId === postId && l.userId === userId),
      );
    } else {
      state.likes = [
        ...state.likes,
        {
          id: createId(),
          postId,
          userId,
        },
      ];
    }

    syncLikes();

    return {
      success: true,
    };
  });
};

export const toggleBookmarkApi = ({ postId, userId }) => {
  return withDelay(() => {
    const existing = state.bookmarks.find(
      (bookmark) => bookmark.postId === postId && bookmark.userId === userId,
    );

    if (existing) {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) =>
          !(bookmark.postId === postId && bookmark.userId === userId),
      );
    } else {
      state.bookmarks = [
        ...state.bookmarks,
        {
          id: createId(),
          postId,
          userId,
        },
      ];
    }

    syncBookmarks();

    return {
      success: true,
    };
  });
};

export const addPostApi = ({ userId, images, caption }) => {
  return withDelay(() => {
    const newPost = {
      id: createId(),
      userId,
      images,
      caption,
      commentCount: 0,
      createdAt: new Date().toISOString(),
    };

    state.posts = [newPost, ...state.posts];
    const saved = syncPosts();

    if (!saved) {
      return {
        success: false,
        message:
          "게시글 저장에 실패했습니다. 이미지 용량이 너무 클 수 있습니다.",
      };
    }

    return {
      success: true,
      post: newPost,
    };
  });
};
