import {
  fetchStoryWindowRepository,
  fetchStoryWindowByIndexRepository,
} from "../repositories/storyRepository";

export const getStoryWindow = async ({
  currentUserId,
  clickedUserId,
  windowSize = 5,
}) => {
  if (!currentUserId) {
    return {
      success: false,
      message: "currentUserId가 필요합니다.",
    };
  }

  if (!clickedUserId) {
    return {
      success: false,
      message: "clickedUserId가 필요합니다.",
    };
  }

  return await fetchStoryWindowRepository({
    currentUserId,
    clickedUserId,
    windowSize,
  });
};

export const getStoryWindowByIndex = async ({
  currentUserId,
  currentIndex,
  windowSize = 5,
}) => {
  if (!currentUserId) {
    return {
      success: false,
      message: "currentUserId가 필요합니다.",
    };
  }

  if (typeof currentIndex !== "number") {
    return {
      success: false,
      message: "currentIndex가 필요합니다.",
    };
  }

  return await fetchStoryWindowByIndexRepository({
    currentUserId,
    currentIndex,
    windowSize,
  });
};
