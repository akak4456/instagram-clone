import { withDelay } from "../utils/delay";
import { createId } from "../utils/id";
import { sortByCreatedAtDesc } from "../utils/sort";
import { state, syncComments, syncCommentsLikes } from "../store/mockState";

export const fetchCommentsApi = (postId, page = 1, limit = 10) => {
  return withDelay(() => {
    const filtered = state.comments.filter((c) => c.postId === postId);
    const sorted = sortByCreatedAtDesc(filtered);

    const start = (page - 1) * limit;
    const end = start + limit;

    const pagedComments = sorted.slice(start, end).map((comment) => {
      const likes = state.commentsLikes.filter(
        (cl) => cl.commentId === comment.id,
      );
      const user = state.users.find((u) => u.userId === comment.userId);

      return {
        ...comment,
        user,
        likes,
      };
    });

    return {
      success: true,
      comments: pagedComments,
      hasMore: end < sorted.length,
    };
  });
};

export const toggleCommentLikeApi = ({ commentId, userId }) => {
  return withDelay(() => {
    const existing = state.commentsLikes.find(
      (cl) => cl.commentId === commentId && cl.userId === userId,
    );

    if (existing) {
      state.commentsLikes = state.commentsLikes.filter(
        (cl) => !(cl.commentId === commentId && cl.userId === userId),
      );
    } else {
      state.commentsLikes = [
        ...state.commentsLikes,
        {
          id: createId(),
          commentId,
          userId,
        },
      ];
    }

    syncCommentsLikes();

    return {
      success: true,
    };
  });
};

export const addCommentApi = ({ postId, userId, content }) => {
  return withDelay(() => {
    const newComment = {
      id: createId(),
      postId,
      userId,
      content,
      createdAt: new Date().toISOString(),
    };

    state.comments = [newComment, ...state.comments];
    syncComments();

    return {
      success: true,
      comment: newComment,
    };
  });
};
