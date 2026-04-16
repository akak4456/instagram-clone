import { createContext, useCallback, useMemo, useState } from "react";
import {
  getStoryWindow,
  getStoryWindowByIndex,
} from "../services/storyService";

export const StoryContext = createContext(null);

const INITIAL_STORY_STATE = {
  stories: [],
  storyLoading: false,
  isStoryOpen: false,
  currentUserId: null,
  currentIndex: 0,
  windowStartIndex: 0,
  totalCount: 0,
  hasPrev: false,
  hasNext: false,
};

export const StoryProvider = ({ children }) => {
  const [stories, setStories] = useState(INITIAL_STORY_STATE.stories);
  const [storyLoading, setStoryLoading] = useState(
    INITIAL_STORY_STATE.storyLoading,
  );
  const [isStoryOpen, setIsStoryOpen] = useState(
    INITIAL_STORY_STATE.isStoryOpen,
  );
  const [currentUserId, setCurrentUserId] = useState(
    INITIAL_STORY_STATE.currentUserId,
  );
  const [currentIndex, setCurrentIndex] = useState(
    INITIAL_STORY_STATE.currentIndex,
  );
  const [windowStartIndex, setWindowStartIndex] = useState(
    INITIAL_STORY_STATE.windowStartIndex,
  );
  const [totalCount, setTotalCount] = useState(INITIAL_STORY_STATE.totalCount);
  const [hasPrev, setHasPrev] = useState(INITIAL_STORY_STATE.hasPrev);
  const [hasNext, setHasNext] = useState(INITIAL_STORY_STATE.hasNext);

  const resetStoryState = useCallback(() => {
    setStories(INITIAL_STORY_STATE.stories);
    setStoryLoading(INITIAL_STORY_STATE.storyLoading);
    setIsStoryOpen(INITIAL_STORY_STATE.isStoryOpen);
    setCurrentUserId(INITIAL_STORY_STATE.currentUserId);
    setCurrentIndex(INITIAL_STORY_STATE.currentIndex);
    setWindowStartIndex(INITIAL_STORY_STATE.windowStartIndex);
    setTotalCount(INITIAL_STORY_STATE.totalCount);
    setHasPrev(INITIAL_STORY_STATE.hasPrev);
    setHasNext(INITIAL_STORY_STATE.hasNext);
  }, []);

  const applyStoryWindowState = useCallback((data, viewerUserId = null) => {
    if (viewerUserId) {
      setCurrentUserId(viewerUserId);
    }

    setStories(data.stories ?? []);
    setCurrentIndex(data.currentIndex ?? 0);
    setWindowStartIndex(data.windowStartIndex ?? 0);
    setTotalCount(data.totalCount ?? 0);
    setHasPrev(data.hasPrev ?? false);
    setHasNext(data.hasNext ?? false);
  }, []);

  const openStory = useCallback(
    async ({ currentUserId: viewerUserId, clickedUserId, windowSize = 5 }) => {
      if (!viewerUserId || !clickedUserId) {
        return {
          success: false,
          message: "스토리를 열기 위한 정보가 부족합니다.",
        };
      }

      setStoryLoading(true);

      try {
        const data = await getStoryWindow({
          currentUserId: viewerUserId,
          clickedUserId,
          windowSize,
        });

        if (!data.success) {
          return data;
        }

        applyStoryWindowState(data, viewerUserId);
        setIsStoryOpen(true);

        return {
          success: true,
        };
      } catch (error) {
        console.error("스토리 열기 실패:", error);

        return {
          success: false,
          message: "스토리를 여는 중 오류가 발생했습니다.",
        };
      } finally {
        setStoryLoading(false);
      }
    },
    [applyStoryWindowState],
  );

  const moveStoryTo = useCallback(
    async (nextIndex, windowSize = 5) => {
      if (!currentUserId) {
        return {
          success: false,
          message: "현재 사용자 정보가 없습니다.",
        };
      }

      if (nextIndex < 0 || nextIndex >= totalCount) {
        return {
          success: false,
          message: "유효하지 않은 스토리 인덱스입니다.",
        };
      }

      setStoryLoading(true);

      try {
        const data = await getStoryWindowByIndex({
          currentUserId,
          currentIndex: nextIndex,
          windowSize,
        });

        if (!data.success) {
          return data;
        }

        applyStoryWindowState(data);

        return {
          success: true,
        };
      } catch (error) {
        console.error("스토리 이동 실패:", error);

        return {
          success: false,
          message: "스토리 이동 중 오류가 발생했습니다.",
        };
      } finally {
        setStoryLoading(false);
      }
    },
    [currentUserId, totalCount, applyStoryWindowState],
  );

  const nextStory = useCallback(
    async (windowSize = 5) => {
      if (!hasNext) return;
      return await moveStoryTo(currentIndex + 1, windowSize);
    },
    [hasNext, currentIndex, moveStoryTo],
  );

  const prevStory = useCallback(
    async (windowSize = 5) => {
      if (!hasPrev) return;
      return await moveStoryTo(currentIndex - 1, windowSize);
    },
    [hasPrev, currentIndex, moveStoryTo],
  );

  const closeStory = useCallback(() => {
    resetStoryState();
  }, [resetStoryState]);

  const activeLocalIndex =
    currentIndex >= 0 ? currentIndex - windowStartIndex : 0;

  const value = useMemo(
    () => ({
      stories,
      storyLoading,
      isStoryOpen,
      currentIndex,
      windowStartIndex,
      totalCount,
      hasPrev,
      hasNext,
      activeLocalIndex,

      openStory,
      closeStory,
      nextStory,
      prevStory,
      moveStoryTo,
      resetStoryState,
    }),
    [
      stories,
      storyLoading,
      isStoryOpen,
      currentIndex,
      windowStartIndex,
      totalCount,
      hasPrev,
      hasNext,
      activeLocalIndex,
      openStory,
      closeStory,
      nextStory,
      prevStory,
      moveStoryTo,
      resetStoryState,
    ],
  );

  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
};
