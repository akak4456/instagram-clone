import { withDelay } from "../utils/delay";
import { state, syncUsers } from "../store/mockState";
import { sortByCreatedAtDesc } from "../utils/sort";

export const fetchUsersApi = () => {
  return withDelay(() => state.users);
};

export const fetchFollowingUsersApi = (userId) => {
  return withDelay(() => {
    const currentUser = state.users.find((u) => u.userId === userId);

    if (!currentUser) {
      return {
        success: false,
        message: "유저를 찾을 수 없습니다.",
      };
    }

    const followingUsers = currentUser.following
      .map((followingUserId) =>
        state.users.find((u) => u.userId === followingUserId),
      )
      .filter(Boolean);

    return {
      success: true,
      users: followingUsers,
    };
  });
};

export const searchUsersApi = (keyword) => {
  return withDelay(() => {
    const trimmed = keyword.trim().toLowerCase();

    if (!trimmed) return [];

    return state.users.filter((user) => {
      const userId = user.userId?.toLowerCase() || "";
      const username = user.username?.toLowerCase() || "";
      return userId.includes(trimmed) || username.includes(trimmed);
    });
  });
};

export const getUserApi = (userId) => {
  return withDelay(() => {
    const foundUser = state.users.find((user) => user.userId === userId);

    if (!foundUser) {
      return {
        success: false,
        message: "유저를 찾을 수 없습니다.",
        user: null,
      };
    }

    const followers = state.users.filter((user) =>
      user.following?.includes(userId),
    );

    const following = (foundUser.following || [])
      .map((followingUserId) =>
        state.users.find((user) => user.userId === followingUserId),
      )
      .filter(Boolean);

    const postsCount = state.posts.filter(
      (post) => post.userId === userId,
    ).length;

    return {
      success: true,
      user: {
        ...foundUser,
        followers,
        following,
        postsCount,
      },
    };
  });
};

export const fetchUserPostsApi = (userId) => {
  return withDelay(() => {
    const userPosts = sortByCreatedAtDesc(
      state.posts.filter((post) => post.userId === userId),
    );

    return {
      success: true,
      posts: userPosts,
    };
  });
};

export const fetchUserReelsApi = (userId) => {
  return withDelay(() => {
    const reels = sortByCreatedAtDesc(
      state.posts.filter((post) => post.userId === userId),
    );

    return {
      success: true,
      reels,
    };
  });
};

export const fetchUserSavedPostsApi = (userId) => {
  return withDelay(() => {
    const savedPostIds = state.bookmarks
      .filter((bookmark) => bookmark.userId === userId)
      .map((bookmark) => bookmark.postId);

    const savedPosts = sortByCreatedAtDesc(
      state.posts.filter((post) => savedPostIds.includes(post.id)),
    );

    return {
      success: true,
      posts: savedPosts,
    };
  });
};

export const fetchUserTaggedPostsApi = () => {
  return withDelay(() => {
    return {
      success: true,
      posts: [],
    };
  });
};

export const removeFollowerApi = ({ profileUserId, followerUserId }) => {
  return withDelay(() => {
    const profileUser = state.users.find((u) => u.userId === profileUserId);
    const followerUser = state.users.find((u) => u.userId === followerUserId);

    if (!profileUser) {
      return {
        success: false,
        message: "프로필 유저를 찾을 수 없습니다.",
      };
    }

    if (!followerUser) {
      return {
        success: false,
        message: "삭제할 팔로워 유저를 찾을 수 없습니다.",
      };
    }

    const isFollowing = followerUser.following?.includes(profileUserId);

    if (!isFollowing) {
      return {
        success: false,
        message: "해당 유저는 현재 이 프로필을 팔로우하고 있지 않습니다.",
      };
    }

    followerUser.following = followerUser.following.filter(
      (followingUserId) => followingUserId !== profileUserId,
    );

    syncUsers();

    return {
      success: true,
      message: "팔로워를 삭제했습니다.",
    };
  });
};

export const unfollowUserApi = ({ profileUserId, targetUserId }) => {
  return withDelay(() => {
    const profileUser = state.users.find((u) => u.userId === profileUserId);
    const targetUser = state.users.find((u) => u.userId === targetUserId);

    if (!profileUser) {
      return {
        success: false,
        message: "프로필 유저를 찾을 수 없습니다.",
      };
    }

    if (!targetUser) {
      return {
        success: false,
        message: "대상 유저를 찾을 수 없습니다.",
      };
    }

    const isFollowing = profileUser.following?.includes(targetUserId);

    if (!isFollowing) {
      return {
        success: false,
        message: "현재 팔로우 중인 유저가 아닙니다.",
      };
    }

    profileUser.following = profileUser.following.filter(
      (followingUserId) => followingUserId !== targetUserId,
    );

    syncUsers();

    return {
      success: true,
      message: "팔로잉을 취소했습니다.",
    };
  });
};

export const followUserApi = ({ currentUserId, targetUserId }) => {
  return withDelay(() => {
    if (!currentUserId || !targetUserId) {
      return {
        success: false,
        message: "잘못된 요청입니다.",
      };
    }

    if (currentUserId === targetUserId) {
      return {
        success: false,
        message: "자기 자신을 팔로우할 수 없습니다.",
      };
    }

    const currentUser = state.users.find(
      (user) => user.userId === currentUserId,
    );
    const targetUser = state.users.find((user) => user.userId === targetUserId);

    if (!currentUser || !targetUser) {
      return {
        success: false,
        message: "사용자를 찾을 수 없습니다.",
      };
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id !== targetUserId,
      );

      syncUsers();

      return {
        success: true,
        following: false,
        message: "언팔로우 되었습니다.",
      };
    }

    currentUser.following.push(targetUserId);
    syncUsers();

    return {
      success: true,
      following: true,
      message: "팔로우 되었습니다.",
    };
  });
};
