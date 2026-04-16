import { fetchStoryWindowApi, fetchStoryWindowByIndexApi } from "../mocks/api";

export const fetchStoryWindowRepository = async ({
  currentUserId,
  clickedUserId,
  windowSize,
}) => {
  return await fetchStoryWindowApi({
    currentUserId,
    clickedUserId,
    windowSize,
  });
};

export const fetchStoryWindowByIndexRepository = async ({
  currentUserId,
  currentIndex,
  windowSize,
}) => {
  return await fetchStoryWindowByIndexApi({
    currentUserId,
    currentIndex,
    windowSize,
  });
};
