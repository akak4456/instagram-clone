import { useEffect, useRef, useState } from "react";
import { usePost } from "../hooks/usePost";
import ReelsViewer from "../features/reels/ReelsViewer";
import {
  ReelsPageContainer,
  ReelsCenterArea,
  ReelsNavButtons,
  ReelsNavButton,
  EmptyState,
} from "../styles/features/reels.styles";

const WHEEL_COOLDOWN = 700;

const Reels = () => {
  const { posts } = usePost();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("down");
  const isAnimatingRef = useRef(false);

  const reelsPosts = posts ?? [];

  const moveToNext = () => {
    if (isAnimatingRef.current) return;
    if (currentIndex >= reelsPosts.length - 1) return;

    isAnimatingRef.current = true;
    setDirection("down");
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, WHEEL_COOLDOWN);
  };

  const moveToPrev = () => {
    if (isAnimatingRef.current) return;
    if (currentIndex <= 0) return;

    isAnimatingRef.current = true;
    setDirection("up");
    setCurrentIndex((prev) => prev - 1);

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, WHEEL_COOLDOWN);
  };

  useEffect(() => {
    if (currentIndex > reelsPosts.length - 1) {
      setCurrentIndex(0);
    }
  }, [reelsPosts.length, currentIndex]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimatingRef.current) return;

      if (e.deltaY > 0) {
        moveToNext();
      } else if (e.deltaY < 0) {
        moveToPrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex, reelsPosts.length]);

  if (!reelsPosts.length) {
    return (
      <ReelsPageContainer>
        <EmptyState>표시할 릴스가 없습니다.</EmptyState>
      </ReelsPageContainer>
    );
  }

  return (
    <ReelsPageContainer>
      <ReelsCenterArea>
        <ReelsViewer
          post={reelsPosts[currentIndex]}
          direction={direction}
          key={reelsPosts[currentIndex].id}
        />
      </ReelsCenterArea>

      <ReelsNavButtons>
        <ReelsNavButton
          onClick={moveToPrev}
          disabled={currentIndex === 0}
          aria-label="이전 릴스"
        >
          ↑
        </ReelsNavButton>

        <ReelsNavButton
          onClick={moveToNext}
          disabled={currentIndex === reelsPosts.length - 1}
          aria-label="다음 릴스"
        >
          ↓
        </ReelsNavButton>
      </ReelsNavButtons>
    </ReelsPageContainer>
  );
};

export default Reels;
