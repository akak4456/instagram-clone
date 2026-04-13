const MAX_RECENT_USERS = 10;

export const loadRecentUsers = (storageKey) => {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
};

export const saveRecentUsers = (storageKey, users) => {
  localStorage.setItem(storageKey, JSON.stringify(users));
};

export const normalizeRecentUser = (user) => {
  return {
    userId: user.userId,
    username: user.username,
    profileImage: user.profileImage,
    isVerified: user.isVerified || false,
    meta: user.meta || user.bio || user.name || "",
  };
};

export const upsertRecentUser = (recentUsers, user) => {
  const normalized = normalizeRecentUser(user);

  return [
    normalized,
    ...recentUsers.filter((item) => item.userId !== normalized.userId),
  ].slice(0, MAX_RECENT_USERS);
};
