import { posts as initialPosts } from "./posts";
import { users as initialUsers } from "./users";
import { likes as initialLikes } from "./likes";
import { comments as initialComments } from "./comments";
import { commentsLikes as initialCommentsLikes } from "./commentsLikes";
import { bookmarks as initialBookmarks } from "./bookmarks";

/**
 * localStorage key
 */
const STORAGE_KEYS = {
  users: "mock_users",
  posts: "mock_posts",
  likes: "mock_likes",
  comments: "mock_comments",
  commentsLikes: "mock_comments_likes",
  bookmarks: "mock_bookmarks",
};

/**
 * localStorage 에서 데이터 읽기
 * - 저장된 값이 있으면 그것을 사용
 * - 없으면 initial 데이터를 사용
 */
const getStorageData = (key, initialValue) => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return [...initialValue];
    return JSON.parse(stored);
  } catch (error) {
    console.error(`${key} 읽기 실패`, error);
    return [...initialValue];
  }
};

/**
 * localStorage 에 데이터 저장
 */
const setStorageData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`${key} 저장 실패`, error);
  }
};

/**
 * 현재 메모리 데이터
 * - 앱이 다시 로드되어도 localStorage 에 저장된 값을 다시 읽어오므로
 *   기존처럼 쉽게 초기화되지 않음
 */
let users = getStorageData(STORAGE_KEYS.users, initialUsers);
let posts = getStorageData(STORAGE_KEYS.posts, initialPosts);
let likes = getStorageData(STORAGE_KEYS.likes, initialLikes);
let comments = getStorageData(STORAGE_KEYS.comments, initialComments);
let commentsLikes = getStorageData(
  STORAGE_KEYS.commentsLikes,
  initialCommentsLikes,
);
let bookmarks = getStorageData(STORAGE_KEYS.bookmarks, initialBookmarks);

/**
 * 각 데이터 변경 후 localStorage 동기화
 */
const syncUsers = () => setStorageData(STORAGE_KEYS.users, users);
const syncPosts = () => setStorageData(STORAGE_KEYS.posts, posts);
const syncLikes = () => setStorageData(STORAGE_KEYS.likes, likes);
const syncComments = () => setStorageData(STORAGE_KEYS.comments, comments);
const syncCommentsLikes = () =>
  setStorageData(STORAGE_KEYS.commentsLikes, commentsLikes);
const syncBookmarks = () => setStorageData(STORAGE_KEYS.bookmarks, bookmarks);

/**
 * 개발용: mock 데이터 전체 초기화
 * 필요할 때 콘솔이나 버튼에서 호출해서 사용
 */
export const resetMockData = () => {
  users = [...initialUsers];
  posts = [...initialPosts];
  likes = [...initialLikes];
  comments = [...initialComments];
  commentsLikes = [...initialCommentsLikes];
  bookmarks = [...initialBookmarks];

  syncUsers();
  syncPosts();
  syncLikes();
  syncComments();
  syncCommentsLikes();
  syncBookmarks();
};

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
      syncUsers();

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

      const followingUsers = currentUser.following
        .map((followingUserId) =>
          users.find((u) => u.userId === followingUserId),
        )
        .filter(Boolean);

      resolve({
        success: true,
        users: followingUsers,
      });
    }, 300);
  });
};

const getFeedPosts = (currentUserId) => {
  return posts.map((post) => {
    const user = users.find((u) => u.userId === post.userId);
    const likesFiltered = likes.filter((l) => l.postId === post.id);
    const commentFiltered = comments.filter((c) => c.postId === post.id);
    const isBookmarked = bookmarks.some(
      (bookmark) =>
        bookmark.postId === post.id && bookmark.userId === currentUserId,
    );

    return {
      ...post,
      user,
      likes: likesFiltered,
      commentCount: commentFiltered.length,
      isBookmarked,
    };
  });
};

export const fetchFeed = (currentUserId, page = 1, limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allPosts = getFeedPosts(currentUserId);

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
        likes = likes.filter(
          (l) => !(l.postId === postId && l.userId === userId),
        );
      } else {
        likes.push({
          id: Date.now(),
          postId,
          userId,
        });
      }

      syncLikes();

      resolve({
        success: true,
      });
    }, 200);
  });
};

export const fetchCommentsApi = (postId, page = 1, limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = comments.filter((c) => c.postId === postId);

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
          user,
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
        commentsLikes = commentsLikes.filter(
          (cl) => !(cl.commentId === commentId && cl.userId === userId),
        );
      } else {
        commentsLikes.push({
          id: Date.now(),
          commentId,
          userId,
        });
      }

      syncCommentsLikes();

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

      comments.unshift(newComment);
      syncComments();

      resolve({
        success: true,
        comment: newComment,
      });
    }, 200);
  });
};

export const toggleBookmarkApi = ({ postId, userId }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existing = bookmarks.find(
        (bookmark) => bookmark.postId === postId && bookmark.userId === userId,
      );

      if (existing) {
        bookmarks = bookmarks.filter(
          (bookmark) =>
            !(bookmark.postId === postId && bookmark.userId === userId),
        );
      } else {
        bookmarks.push({
          id: Date.now(),
          postId,
          userId,
        });
      }

      syncBookmarks();

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
        id: Date.now(),
        userId,
        images,
        caption,
        commentCount: 0,
        createdAt: new Date().toISOString(),
      };

      posts.unshift(newPost);
      syncPosts();

      resolve({
        success: true,
        post: newPost,
      });
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

const getLatestPostByUserId = (userId) => {
  const userPosts = posts
    .filter((post) => post.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return userPosts[0] || null;
};

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

const getStoryWindowRange = (totalCount, centerIndex, windowSize = 5) => {
  const safeWindowSize = Math.max(1, windowSize);
  const safeCenterIndex = Math.max(0, Math.min(centerIndex, totalCount - 1));
  const sideCount = Math.floor(safeWindowSize / 2);

  let startIndex = safeCenterIndex - sideCount;
  let endIndex = safeCenterIndex + sideCount + 1;

  if (startIndex < 0) {
    endIndex += -startIndex;
    startIndex = 0;
  }

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

export const searchUsersApi = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const trimmed = keyword.trim().toLowerCase();

      if (!trimmed) {
        resolve([]);
        return;
      }

      const filtered = users.filter((user) => {
        const userId = user.userId?.toLowerCase() || "";
        const username = user.username?.toLowerCase() || "";

        return userId.includes(trimmed) || username.includes(trimmed);
      });

      resolve(filtered);
    }, 300);
  });
};
