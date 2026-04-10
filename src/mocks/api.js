import { posts as initialPosts } from "./posts";
import { users as initialUsers } from "./users";
import { likes as initialLikes } from "./likes";
import { comments as initialComments } from "./comments";
import { commentsLikes as initialCommentsLikes } from "./commentsLikes";

let users = [...initialUsers];
let posts = [...initialPosts];
let likes = [...initialLikes];
let comments = [...initialComments];
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
        user: {
          userId: foundUser.userId,
          profileImage: foundUser.profileImage,
          username: foundUser.username,
        },
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

export const addPostApi = ({ userId, images, caption }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPost = {
        id: Date.now(), // 고유 id
        userId,
        images,
        caption,
        commentCount: 0,
        createdAt: new Date().toISOString(),
        isBookmarked: false,
      };
      posts.unshift(newPost); // 최신순 기준 앞에 추가
      resolve({ success: true, post: newPost });
    }, 500);
  });
};

const getFollowingUsersInOrder = (currentUserId) => {
  const currentUser = users.find((u) => u.userId === currentUserId);

  if (!currentUser) return [];

  return currentUser.following
    .map((followingUserId) => users.find((u) => u.userId === followingUserId))
    .filter(Boolean);
};

// 특정 유저의 최신 post 1개 반환
const getLatestPostByUserId = (userId) => {
  const userPosts = posts
    .filter((post) => post.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return userPosts[0] || null;
};

// following 유저들의 최신 post를 following 순서대로 story 목록으로 변환
const getStoriesByFollowing = (currentUserId) => {
  const followingUsers = getFollowingUsersInOrder(currentUserId);

  return followingUsers
    .map((user) => {
      const latestPost = getLatestPostByUserId(user.userId);

      if (!latestPost) return null;

      return {
        user: {
          userId: user.userId,
          username: user.username,
          profileImage: user.profileImage,
        },
        post: latestPost,
      };
    })
    .filter(Boolean);
};

// centerIndex 기준으로 window 범위 계산
const getStoryWindowRange = (totalCount, centerIndex, windowSize = 5) => {
  const safeWindowSize = Math.max(1, windowSize);
  const safeCenterIndex = Math.max(0, Math.min(centerIndex, totalCount - 1));
  const sideCount = Math.floor(safeWindowSize / 2);

  let startIndex = safeCenterIndex - sideCount;
  let endIndex = safeCenterIndex + sideCount + 1;

  // 왼쪽 부족분 보정
  if (startIndex < 0) {
    endIndex += -startIndex;
    startIndex = 0;
  }

  // 오른쪽 부족분 보정
  if (endIndex > totalCount) {
    const overflow = endIndex - totalCount;
    startIndex = Math.max(0, startIndex - overflow);
    endIndex = totalCount;
  }

  return {
    startIndex,
    endIndex,
    centerIndex: safeCenterIndex,
  };
};

// 클릭한 유저 기준으로 가운데 정렬된 story window 반환
export const fetchStoryWindowApi = ({
  currentUserId,
  clickedUserId,
  windowSize = 5,
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = users.find((u) => u.userId === currentUserId);

      if (!currentUser) {
        resolve({
          success: false,
          message: "유저를 찾을 수 없습니다.",
          stories: [],
        });
        return;
      }

      const allStories = getStoriesByFollowing(currentUserId);

      if (!allStories.length) {
        resolve({
          success: true,
          stories: [],
          totalCount: 0,
          currentIndex: -1,
          windowStartIndex: 0,
          windowEndIndex: 0,
          hasPrev: false,
          hasNext: false,
        });
        return;
      }

      const clickedIndex = allStories.findIndex(
        (story) => story.user.userId === clickedUserId,
      );

      const currentIndex = clickedIndex >= 0 ? clickedIndex : 0;

      const { startIndex, endIndex } = getStoryWindowRange(
        allStories.length,
        currentIndex,
        windowSize,
      );

      const windowStories = allStories.slice(startIndex, endIndex);

      resolve({
        success: true,
        stories: windowStories,
        totalCount: allStories.length,
        currentIndex,
        windowStartIndex: startIndex,
        windowEndIndex: endIndex,
        hasPrev: currentIndex > 0,
        hasNext: currentIndex < allStories.length - 1,
      });
    }, 300);
  });
};

// 전체 story index 기준으로 window 반환
// prev / next 이동 시 사용
export const fetchStoryWindowByIndexApi = ({
  currentUserId,
  currentIndex,
  windowSize = 5,
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = users.find((u) => u.userId === currentUserId);

      if (!currentUser) {
        resolve({
          success: false,
          message: "유저를 찾을 수 없습니다.",
          stories: [],
        });
        return;
      }

      const allStories = getStoriesByFollowing(currentUserId);

      if (!allStories.length) {
        resolve({
          success: true,
          stories: [],
          totalCount: 0,
          currentIndex: -1,
          windowStartIndex: 0,
          windowEndIndex: 0,
          hasPrev: false,
          hasNext: false,
        });
        return;
      }

      const safeCurrentIndex = Math.max(
        0,
        Math.min(currentIndex, allStories.length - 1),
      );

      const { startIndex, endIndex } = getStoryWindowRange(
        allStories.length,
        safeCurrentIndex,
        windowSize,
      );

      const windowStories = allStories.slice(startIndex, endIndex);

      resolve({
        success: true,
        stories: windowStories,
        totalCount: allStories.length,
        currentIndex: safeCurrentIndex,
        windowStartIndex: startIndex,
        windowEndIndex: endIndex,
        hasPrev: safeCurrentIndex > 0,
        hasNext: safeCurrentIndex < allStories.length - 1,
      });
    }, 300);
  });
};

// 일반적인 pagination 형태가 필요할 때 사용하는 API
// clickedUserId부터 오른쪽으로 limit개씩 잘라서 가져옴
export const fetchStoriesPaginationApi = ({
  currentUserId,
  page = 1,
  limit = 5,
  clickedUserId = null,
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = users.find((u) => u.userId === currentUserId);

      if (!currentUser) {
        resolve({
          success: false,
          message: "유저를 찾을 수 없습니다.",
          stories: [],
          hasMore: false,
        });
        return;
      }

      const allStories = getStoriesByFollowing(currentUserId);

      if (!allStories.length) {
        resolve({
          success: true,
          stories: [],
          hasMore: false,
          totalCount: 0,
          startIndex: 0,
        });
        return;
      }

      let baseIndex = 0;

      if (clickedUserId) {
        const foundIndex = allStories.findIndex(
          (story) => story.user.userId === clickedUserId,
        );
        baseIndex = foundIndex >= 0 ? foundIndex : 0;
      }

      const start = baseIndex + (page - 1) * limit;
      const end = start + limit;
      const pagedStories = allStories.slice(start, end);

      resolve({
        success: true,
        stories: pagedStories,
        hasMore: end < allStories.length,
        totalCount: allStories.length,
        startIndex: start,
        baseIndex,
      });
    }, 300);
  });
};
