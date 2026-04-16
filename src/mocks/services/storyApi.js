import { withDelay } from "../utils/delay";
import { state } from "../store/mockState";
import { sortByCreatedAtDesc } from "../utils/sort";

const getFollowingUsersInOrder = (currentUserId) => {
  const currentUser = state.users.find((u) => u.userId === currentUserId);
  if (!currentUser) return [];

  return currentUser.following
    .map((followingUserId) =>
      state.users.find((u) => u.userId === followingUserId),
    )
    .filter(Boolean);
};

const getLatestPostByUserId = (userId) => {
  const userPosts = sortByCreatedAtDesc(
    state.posts.filter((post) => post.userId === userId),
  );

  return userPosts[0] || null;
};

const getStoriesByFollowing = (currentUserId) => {
  return getFollowingUsersInOrder(currentUserId)
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
  return withDelay(() => {
    const currentUser = state.users.find((u) => u.userId === currentUserId);

    if (!currentUser) {
      return {
        success: false,
        message: "유저를 찾을 수 없습니다.",
        stories: [],
      };
    }

    const allStories = getStoriesByFollowing(currentUserId);

    if (!allStories.length) {
      return {
        success: true,
        stories: [],
        totalCount: 0,
        currentIndex: -1,
        windowStartIndex: 0,
        windowEndIndex: 0,
        hasPrev: false,
        hasNext: false,
      };
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

    return {
      success: true,
      stories: allStories.slice(startIndex, endIndex),
      totalCount: allStories.length,
      currentIndex,
      windowStartIndex: startIndex,
      windowEndIndex: endIndex,
      hasPrev: currentIndex > 0,
      hasNext: currentIndex < allStories.length - 1,
    };
  });
};

export const fetchStoryWindowByIndexApi = ({
  currentUserId,
  currentIndex,
  windowSize = 5,
}) => {
  return withDelay(() => {
    const currentUser = state.users.find((u) => u.userId === currentUserId);

    if (!currentUser) {
      return {
        success: false,
        message: "유저를 찾을 수 없습니다.",
        stories: [],
      };
    }

    const allStories = getStoriesByFollowing(currentUserId);

    if (!allStories.length) {
      return {
        success: true,
        stories: [],
        totalCount: 0,
        currentIndex: -1,
        windowStartIndex: 0,
        windowEndIndex: 0,
        hasPrev: false,
        hasNext: false,
      };
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

    return {
      success: true,
      stories: allStories.slice(startIndex, endIndex),
      totalCount: allStories.length,
      currentIndex: safeCurrentIndex,
      windowStartIndex: startIndex,
      windowEndIndex: endIndex,
      hasPrev: safeCurrentIndex > 0,
      hasNext: safeCurrentIndex < allStories.length - 1,
    };
  });
};

export const fetchStoriesPaginationApi = ({
  currentUserId,
  page = 1,
  limit = 5,
  clickedUserId = null,
}) => {
  return withDelay(() => {
    const currentUser = state.users.find((u) => u.userId === currentUserId);

    if (!currentUser) {
      return {
        success: false,
        message: "유저를 찾을 수 없습니다.",
        stories: [],
        hasMore: false,
      };
    }

    const allStories = getStoriesByFollowing(currentUserId);

    if (!allStories.length) {
      return {
        success: true,
        stories: [],
        hasMore: false,
        totalCount: 0,
        startIndex: 0,
      };
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

    return {
      success: true,
      stories: allStories.slice(start, end),
      hasMore: end < allStories.length,
      totalCount: allStories.length,
      startIndex: start,
      baseIndex,
    };
  });
};
