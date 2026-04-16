import { createContext, useContext, useState } from "react";
import { fetchStoryWindowApi, fetchStoryWindowByIndexApi } from "../mocks/api";

export const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [storyLoading, setStoryLoading] = useState(false);

  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // 현재 로그인 유저
  const [currentUserId, setCurrentUserId] = useState(null);

  // 전체 story 기준 현재 활성 index
  const [currentIndex, setCurrentIndex] = useState(0);

  // 현재 window 시작 index
  const [windowStartIndex, setWindowStartIndex] = useState(0);

  // 전체 story 수
  const [totalCount, setTotalCount] = useState(0);

  // 이전/다음 존재 여부
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  // 특정 유저 story 열기
  const openStory = async ({
    currentUserId: viewerUserId,
    clickedUserId,
    windowSize = 5,
  }) => {
    if (!viewerUserId || !clickedUserId) return;

    setStoryLoading(true);

    try {
      const data = await fetchStoryWindowApi({
        currentUserId: viewerUserId,
        clickedUserId,
        windowSize,
      });

      if (data.success) {
        setCurrentUserId(viewerUserId);
        setStories(data.stories);
        setCurrentIndex(data.currentIndex);
        setWindowStartIndex(data.windowStartIndex);
        setTotalCount(data.totalCount);
        setHasPrev(data.hasPrev);
        setHasNext(data.hasNext);
        setIsStoryOpen(true);
      }
    } catch (error) {
      console.error("스토리 열기 실패:", error);
    } finally {
      setStoryLoading(false);
    }
  };

  // 특정 index로 이동
  const moveStoryTo = async (nextIndex, windowSize = 5) => {
    if (!currentUserId) return;
    if (nextIndex < 0 || nextIndex >= totalCount) return;

    setStoryLoading(true);

    try {
      const data = await fetchStoryWindowByIndexApi({
        currentUserId,
        currentIndex: nextIndex,
        windowSize,
      });

      if (data.success) {
        setStories(data.stories);
        setCurrentIndex(data.currentIndex);
        setWindowStartIndex(data.windowStartIndex);
        setTotalCount(data.totalCount);
        setHasPrev(data.hasPrev);
        setHasNext(data.hasNext);
      }
    } catch (error) {
      console.error("스토리 이동 실패:", error);
    } finally {
      setStoryLoading(false);
    }
  };

  const nextStory = async (windowSize = 5) => {
    if (!hasNext) return;
    await moveStoryTo(currentIndex + 1, windowSize);
  };

  const prevStory = async (windowSize = 5) => {
    if (!hasPrev) return;
    await moveStoryTo(currentIndex - 1, windowSize);
  };

  const closeStory = () => {
    setStories([]);
    setIsStoryOpen(false);
    setCurrentUserId(null);
    setCurrentIndex(0);
    setWindowStartIndex(0);
    setTotalCount(0);
    setHasPrev(false);
    setHasNext(false);
  };

  // 현재 window 안에서 활성 story의 local index
  const activeLocalIndex =
    currentIndex >= 0 ? currentIndex - windowStartIndex : 0;

  const value = {
    // modal story
    stories,
    storyLoading,
    isStoryOpen,
    currentIndex,
    windowStartIndex,
    totalCount,
    hasPrev,
    hasNext,
    activeLocalIndex,

    // actions
    openStory,
    closeStory,
    nextStory,
    prevStory,
    moveStoryTo,
  };

  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
};
