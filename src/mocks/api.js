import { posts as initialPosts } from "./posts";
import { users as initialUsers } from "./users";
import { likes as initialLikes } from "./likes";
import { comments as initialComments } from "./comments";
import { commentsLikes as initialCommentsLikes } from "./commentsLikes";
import { bookmarks as initialBookmarks } from "./bookmarks";

const DB_NAME = "instagram_clone_db";
const DB_VERSION = 1;

const STORE_NAMES = {
  users: "users",
  posts: "posts",
  likes: "likes",
  comments: "comments",
  commentsLikes: "commentsLikes",
  bookmarks: "bookmarks",
};

let dbPromise = null;

/**
 * IndexedDB 연결
 */
const openDB = () => {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAMES.users)) {
        db.createObjectStore(STORE_NAMES.users, { keyPath: "userId" });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.posts)) {
        db.createObjectStore(STORE_NAMES.posts, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.likes)) {
        db.createObjectStore(STORE_NAMES.likes, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.comments)) {
        db.createObjectStore(STORE_NAMES.comments, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.commentsLikes)) {
        db.createObjectStore(STORE_NAMES.commentsLikes, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.bookmarks)) {
        db.createObjectStore(STORE_NAMES.bookmarks, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

  return dbPromise;
};

/**
 * store 전체 조회
 */
const getAllFromStore = async (storeName) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
};

/**
 * 단일 데이터 저장 / 수정
 */
const putToStore = async (storeName, value) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.put(value);

    request.onsuccess = () => resolve(value);
    request.onerror = () => reject(request.error);
  });
};

/**
 * 여러 데이터 일괄 저장
 */
const bulkPutToStore = async (storeName, values) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    values.forEach((value) => {
      store.put(value);
    });

    tx.oncomplete = () => resolve(values);
    tx.onerror = () => reject(tx.error);
  });
};

/**
 * 단일 데이터 삭제
 */
const deleteFromStore = async (storeName, key) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.delete(key);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

/**
 * store 전체 비우기
 */
const clearStore = async (storeName) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.clear();

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

/**
 * DB 삭제
 * 스키마 바뀌었을 때 개발 중 필요
 */
export const deleteMockDB = () => {
  dbPromise = null;

  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
    request.onblocked = () =>
      reject(
        new Error("DB 삭제가 차단되었습니다. 열린 탭을 닫고 다시 시도하세요."),
      );
  });
};

/**
 * 초기 데이터 주입
 * store가 비어 있을 때만 initial data를 넣음
 */
const ensureStoreInitialized = async (storeName, initialData) => {
  const current = await getAllFromStore(storeName);
  if (current.length > 0) return current;

  await bulkPutToStore(storeName, initialData);
  return initialData;
};

/**
 * DB 전체 초기화
 */
const ensureDBInitialized = async () => {
  await openDB();

  await ensureStoreInitialized(STORE_NAMES.users, initialUsers);
  await ensureStoreInitialized(STORE_NAMES.posts, initialPosts);
  await ensureStoreInitialized(STORE_NAMES.likes, initialLikes);
  await ensureStoreInitialized(STORE_NAMES.comments, initialComments);
  await ensureStoreInitialized(STORE_NAMES.commentsLikes, initialCommentsLikes);
  await ensureStoreInitialized(STORE_NAMES.bookmarks, initialBookmarks);
};

/**
 * 개발용 mock 데이터 리셋
 */
export const resetMockData = async () => {
  await openDB();

  await clearStore(STORE_NAMES.users);
  await clearStore(STORE_NAMES.posts);
  await clearStore(STORE_NAMES.likes);
  await clearStore(STORE_NAMES.comments);
  await clearStore(STORE_NAMES.commentsLikes);
  await clearStore(STORE_NAMES.bookmarks);

  await bulkPutToStore(STORE_NAMES.users, initialUsers);
  await bulkPutToStore(STORE_NAMES.posts, initialPosts);
  await bulkPutToStore(STORE_NAMES.likes, initialLikes);
  await bulkPutToStore(STORE_NAMES.comments, initialComments);
  await bulkPutToStore(STORE_NAMES.commentsLikes, initialCommentsLikes);
  await bulkPutToStore(STORE_NAMES.bookmarks, initialBookmarks);
};

/**
 * store 조회 helper
 */
const getUsers = async () => {
  await ensureDBInitialized();
  return getAllFromStore(STORE_NAMES.users);
};

const getPosts = async () => {
  await ensureDBInitialized();
  return getAllFromStore(STORE_NAMES.posts);
};

const getLikes = async () => {
  await ensureDBInitialized();
  return getAllFromStore(STORE_NAMES.likes);
};

const getComments = async () => {
  await ensureDBInitialized();
  return getAllFromStore(STORE_NAMES.comments);
};

const getCommentsLikes = async () => {
  await ensureDBInitialized();
  return getAllFromStore(STORE_NAMES.commentsLikes);
};

const getBookmarks = async () => {
  await ensureDBInitialized();
  return getAllFromStore(STORE_NAMES.bookmarks);
};

export const fetchUsersApi = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const users = await getUsers();
      resolve(users);
    }, 0);
  });
};

export const loginApi = ({ userId, password }) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const users = await getUsers();
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
    }, 0);
  });
};

export const addUserApi = (newUser) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const users = await getUsers();

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

      await putToStore(STORE_NAMES.users, newUserData);

      resolve({
        success: true,
        user: newUserData,
      });
    }, 0);
  });
};

export const fetchFollowingUsersApi = (userId) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const users = await getUsers();
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
    }, 0);
  });
};

const getFeedPosts = async (currentUserId) => {
  const [posts, users, likes, comments, bookmarks] = await Promise.all([
    getPosts(),
    getUsers(),
    getLikes(),
    getComments(),
    getBookmarks(),
  ]);

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
    setTimeout(async () => {
      const allPosts = await getFeedPosts(currentUserId);

      const sortedPosts = [...allPosts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      const start = (page - 1) * limit;
      const end = start + limit;

      const pagedPosts = sortedPosts.slice(start, end);

      resolve({
        posts: pagedPosts,
        hasMore: end < sortedPosts.length,
      });
    }, 0);
  });
};

export const toggleLikeApi = ({ postId, userId }) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const likes = await getLikes();

      const existing = likes.find(
        (l) => l.postId === postId && l.userId === userId,
      );

      if (existing) {
        await deleteFromStore(STORE_NAMES.likes, existing.id);
      } else {
        await putToStore(STORE_NAMES.likes, {
          id: Date.now(),
          postId,
          userId,
        });
      }

      resolve({
        success: true,
      });
    }, 0);
  });
};

export const fetchCommentsApi = (postId, page = 1, limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const [comments, commentsLikes, users] = await Promise.all([
        getComments(),
        getCommentsLikes(),
        getUsers(),
      ]);

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
    }, 0);
  });
};

export const toggleCommentLikeApi = ({ commentId, userId }) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const commentsLikes = await getCommentsLikes();

      const existing = commentsLikes.find(
        (cl) => cl.commentId === commentId && cl.userId === userId,
      );

      if (existing) {
        await deleteFromStore(STORE_NAMES.commentsLikes, existing.id);
      } else {
        await putToStore(STORE_NAMES.commentsLikes, {
          id: Date.now(),
          commentId,
          userId,
        });
      }

      resolve({
        success: true,
      });
    }, 0);
  });
};

export const addCommentApi = ({ postId, userId, content }) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const newComment = {
        id: Date.now(),
        postId,
        userId,
        content,
        createdAt: new Date().toISOString(),
      };

      await putToStore(STORE_NAMES.comments, newComment);

      resolve({
        success: true,
        comment: newComment,
      });
    }, 0);
  });
};

export const toggleBookmarkApi = ({ postId, userId }) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const bookmarks = await getBookmarks();

      const existing = bookmarks.find(
        (bookmark) => bookmark.postId === postId && bookmark.userId === userId,
      );

      if (existing) {
        await deleteFromStore(STORE_NAMES.bookmarks, existing.id);
      } else {
        await putToStore(STORE_NAMES.bookmarks, {
          id: Date.now(),
          postId,
          userId,
        });
      }

      resolve({
        success: true,
      });
    }, 0);
  });
};

export const addPostApi = ({ userId, images, caption }) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const newPost = {
        id: Date.now(),
        userId,
        images,
        caption,
        createdAt: new Date().toISOString(),
      };

      await putToStore(STORE_NAMES.posts, newPost);

      resolve({
        success: true,
        post: newPost,
      });
    }, 0);
  });
};

const getFollowingUsersInOrder = async (currentUserId) => {
  const users = await getUsers();
  const currentUser = users.find((u) => u.userId === currentUserId);

  if (!currentUser) return [];

  return currentUser.following
    .map((followingUserId) => users.find((u) => u.userId === followingUserId))
    .filter(Boolean);
};

const getLatestPostByUserId = async (userId) => {
  const posts = await getPosts();

  const userPosts = posts
    .filter((post) => post.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return userPosts[0] || null;
};

const getStoriesByFollowing = async (currentUserId) => {
  const followingUsers = await getFollowingUsersInOrder(currentUserId);

  const stories = await Promise.all(
    followingUsers.map(async (user) => {
      const latestPost = await getLatestPostByUserId(user.userId);

      if (!latestPost) return null;

      return {
        user: {
          userId: user.userId,
          username: user.username,
          profileImage: user.profileImage,
        },
        post: latestPost,
      };
    }),
  );

  return stories.filter(Boolean);
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
    setTimeout(async () => {
      const users = await getUsers();
      const currentUser = users.find((u) => u.userId === currentUserId);

      if (!currentUser) {
        resolve({
          success: false,
          message: "유저를 찾을 수 없습니다.",
          stories: [],
        });
        return;
      }

      const allStories = await getStoriesByFollowing(currentUserId);

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
    }, 0);
  });
};

export const fetchStoryWindowByIndexApi = ({
  currentUserId,
  currentIndex,
  windowSize = 5,
}) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const users = await getUsers();
      const currentUser = users.find((u) => u.userId === currentUserId);

      if (!currentUser) {
        resolve({
          success: false,
          message: "유저를 찾을 수 없습니다.",
          stories: [],
        });
        return;
      }

      const allStories = await getStoriesByFollowing(currentUserId);

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
    }, 0);
  });
};

export const fetchStoriesPaginationApi = ({
  currentUserId,
  page = 1,
  limit = 5,
  clickedUserId = null,
}) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const users = await getUsers();
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

      const allStories = await getStoriesByFollowing(currentUserId);

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
    }, 0);
  });
};

export const searchUsersApi = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const users = await getUsers();
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
    }, 0);
  });
};
