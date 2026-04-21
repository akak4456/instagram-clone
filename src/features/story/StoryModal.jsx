import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useStory } from "../../hooks/useStory";
import storyModalX from "../../assets/story-modal-x.png";
import storyInstagramLogo from "../../assets/story-instagram-logo.png";
import {
  Overlay,
  ModalXDiv,
  StoryInstagramLogoDiv,
} from "../../styles/features/story.styles";
import StoryViewport from "./StoryViewport";

const STORY_DURATION = 15000;
const PROGRESS_INTERVAL = 50;

const StoryModal = () => {
  const {
    isStoryOpen,
    stories,
    activeLocalIndex,
    currentIndex,
    nextStory,
    prevStory,
    closeStory,
    hasPrev,
    hasNext,
  } = useStory();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const intervalRef = useRef(null);

  const activeStory = useMemo(() => {
    if (
      !stories.length ||
      activeLocalIndex < 0 ||
      activeLocalIndex >= stories.length
    ) {
      return null;
    }

    return stories[activeLocalIndex];
  }, [stories, activeLocalIndex]);

  const activeImages = useMemo(
    () => activeStory?.post?.images ?? [],
    [activeStory],
  );
  const activeImageSrc =
    activeImages[currentImageIndex] ?? activeImages[0] ?? "";

  const clearProgressInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetCurrentImageProgress = useCallback(() => {
    setProgressPercent(0);
  }, []);

  const handleNext = useCallback(async () => {
    if (!activeStory) return;

    const imagesLength = activeImages.length;

    if (currentImageIndex < imagesLength - 1) {
      setCurrentImageIndex((prev) => prev + 1);
      setProgressPercent(0);
      return;
    }

    if (hasNext) {
      await nextStory();
    }
  }, [activeStory, activeImages, currentImageIndex, hasNext, nextStory]);

  const handlePrev = useCallback(async () => {
    if (!activeStory) return;

    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
      setProgressPercent(0);
      return;
    }

    if (hasPrev) {
      await prevStory();
    }
  }, [activeStory, currentImageIndex, hasPrev, prevStory]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setProgressPercent(0);
    setIsPaused(false);
    setIsMoreOpen(false);
  }, [activeStory?.post?.id]);

  useEffect(() => {
    if (!isStoryOpen || !activeStory || isPaused) {
      clearProgressInterval();
      return;
    }

    clearProgressInterval();

    intervalRef.current = setInterval(() => {
      setProgressPercent((prev) => {
        const nextValue = prev + (PROGRESS_INTERVAL / STORY_DURATION) * 100;

        if (nextValue >= 100) {
          clearProgressInterval();
          handleNext();
          return 100;
        }

        return nextValue;
      });
    }, PROGRESS_INTERVAL);

    return () => clearProgressInterval();
  }, [
    isStoryOpen,
    activeStory,
    currentImageIndex,
    isPaused,
    handleNext,
    clearProgressInterval,
  ]);

  useEffect(() => {
    return () => clearProgressInterval();
  }, [clearProgressInterval]);

  if (!isStoryOpen) return null;

  return createPortal(
    <Overlay>
      <StoryInstagramLogoDiv>
        <img src={storyInstagramLogo} alt="story-instagram-logo" />
      </StoryInstagramLogoDiv>

      <ModalXDiv>
        <img
          src={storyModalX}
          alt="close"
          onClick={() => {
            clearProgressInterval();
            closeStory();
          }}
        />
      </ModalXDiv>

      <StoryViewport
        stories={stories}
        activeLocalIndex={activeLocalIndex}
        currentIndex={currentIndex}
        activeImageSrc={activeImageSrc}
        currentImageIndex={currentImageIndex}
        progressPercent={progressPercent}
        isPaused={isPaused}
        isMoreOpen={isMoreOpen}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={handlePrev}
        onNext={handleNext}
        onResetProgress={resetCurrentImageProgress}
        onTogglePause={() => setIsPaused((prev) => !prev)}
        onToggleMore={() => setIsMoreOpen((prev) => !prev)}
        onCloseMore={() => setIsMoreOpen(false)}
      />
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default StoryModal;
