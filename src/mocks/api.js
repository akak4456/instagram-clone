import { posts as initialPosts } from "./posts";
import { users as initialUsers } from "./users";
import { likes as initialLikes } from "./likes";
import { comments as initialComments } from "./comments";
import { commentsLikes as initialCommentsLikes } from "./commentsLikes";

let users = [...initialUsers];
let posts = Array(100)
  .fill(initialPosts)
  .flat()
  .map((post, idx) => ({
    ...post,
    id: idx + 1, // 🔥 고유 id
  }));
let likes = [...initialLikes];
let comments = Array(100)
  .fill(initialComments)
  .flat()
  .map((comment, idx) => ({
    ...comment,
    id: idx + 1,
  }));
let commentsLikes = [...initialCommentsLikes];

export const fetchUsersApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 300);
  });
};

export const loginApi = ({ userId, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const foundUser = users.find((u) => u.userId === userId);

      if (!foundUser || foundUser.password !== password) {
        resolve({
          success: false,
          message: "입력하신 로그인 정보가 잘못되었습니다.",
        });
        return;
      }

      resolve({
        success: true,
        user: { userId: foundUser.userId },
      });
    }, 500);
  });
};

export const addUserApi = (newUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existsUserId = users.some((u) => u.userId === newUser.userId);
      if (existsUserId) {
        resolve({
          success: false,
          message: "이미 사용 중인 휴대폰 번호 또는 이메일입니다.",
        });
        return;
      }

      const existsUsername = users.some((u) => u.username === newUser.username);
      if (existsUsername) {
        resolve({
          success: false,
          message: "이미 사용 중인 사용자 이름입니다.",
        });
        return;
      }

      const newUserData = {
        ...newUser,
        profileImage: "",
        bio: "",
        following: [],
      };

      users.push(newUserData);

      resolve({
        success: true,
        user: newUserData,
      });
    }, 2000);
  });
};

export const fetchFollowingUsersApi = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = users.find((u) => u.userId === userId);

      if (!currentUser) {
        resolve({
          success: false,
          message: "유저를 찾을 수 없습니다.",
        });
        return;
      }

      const followingUsers = users.filter((u) =>
        currentUser.following.includes(u.userId),
      );

      resolve({
        success: true,
        users: followingUsers,
      });
    }, 300);
  });
};

const getFeedPosts = () => {
  return posts.map((post) => {
    const user = users.find((u) => u.userId === post.userId);
    const likesFiltered = likes.filter((l) => l.postId === post.id);
    const commentFiltered = comments.filter((c) => c.postId === post.id);

    return {
      ...post,
      user,
      likes: likesFiltered,
      commentCount: commentFiltered.length,
    };
  });
};

export const fetchFeed = (page = 1, limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allPosts = getFeedPosts();

      const start = (page - 1) * limit;
      const end = start + limit;

      const pagedPosts = allPosts.slice(start, end);

      resolve({
        posts: pagedPosts,
        hasMore: end < allPosts.length,
      });
    }, 500);
  });
};

export const toggleLikeApi = ({ postId, userId }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existing = likes.find(
        (l) => l.postId === postId && l.userId === userId,
      );

      if (existing) {
        // 🔥 좋아요 취소
        likes = likes.filter(
          (l) => !(l.postId === postId && l.userId === userId),
        );
      } else {
        // 🔥 좋아요 추가
        likes.push({
          id: Date.now(),
          postId,
          userId,
        });
      }

      resolve({
        success: true,
      });
    }, 200);
  });
};

export const fetchCommentsApi = (postId, page = 1, limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 🔥 해당 post의 댓글만 필터링
      const filtered = comments.filter((c) => c.postId === postId);

      // 🔥 최신순 정렬 (선택)
      const sorted = [...filtered].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      const start = (page - 1) * limit;
      const end = start + limit;

      const pagedComments = sorted.slice(start, end).map((comment) => {
        const commentsLikesFilter = commentsLikes.filter(
          (cl) => cl.commentId === comment.id,
        );
        const user = users.find((u) => u.userId === comment.userId);
        return {
          ...comment,
          user: user,
          likes: commentsLikesFilter,
        };
      });

      resolve({
        success: true,
        comments: pagedComments,
        hasMore: end < sorted.length,
      });
    }, 300);
  });
};

export const toggleCommentLikeApi = ({ commentId, userId }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existing = commentsLikes.find(
        (cl) => cl.commentId === commentId && cl.userId === userId,
      );

      if (existing) {
        // 🔥 좋아요 취소
        commentsLikes = commentsLikes.filter(
          (cl) => !(cl.commentId === commentId && cl.userId === userId),
        );
      } else {
        // 🔥 좋아요 추가
        commentsLikes.push({
          id: Date.now(),
          commentId,
          userId,
        });
      }

      resolve({
        success: true,
      });
    }, 200);
  });
};

export const addCommentApi = ({ postId, userId, content }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        postId,
        userId,
        content,
        createdAt: new Date().toISOString(),
      };

      comments.unshift(newComment); // 🔥 최신순 기준이면 앞에 추가

      resolve({
        success: true,
        comment: newComment,
      });
    }, 200);
  });
};

export const toggleBookmarkApi = ({ postId }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts = posts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post,
      );

      resolve({
        success: true,
      });
    }, 200);
  });
};
