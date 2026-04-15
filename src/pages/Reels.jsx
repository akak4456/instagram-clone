import { useEffect, useRef, useState } from "react";
import { usePost } from "../hooks/usePost";
import ReelsViewer from "../features/reels/ReelsViewer";
import ReelsSideActions from "../features/reels/ReelsSideActions";
import {
  ReelsPageContainer,
  ReelsCenterArea,
  ReelsNavButtons,
  ReelsNavButton,
  EmptyState,
  ReelsStage,
  ReelScene,
  AnimatedReelLayer,
} from "../styles/features/reels.styles";

const ANIMATION_DURATION = 450;
const WHEEL_COOLDOWN = 700;

const Reels = () => {
  const { posts } = usePost();

  const reelsPosts = posts ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [direction, setDirection] = useState("down");
  const [isAnimating, setIsAnimating] = useState(false);

  const isCoolingRef = useRef(false);
  const animationTimeoutRef = useRef(null);
  const cooldownTimeoutRef = useRef(null);

  const currentPost = reelsPosts[currentIndex];
  const incomingPost = nextIndex !== null ? reelsPosts[nextIndex] : null;

  const startTransition = (targetIndex, moveDirection) => {
    if (isAnimating || isCoolingRef.current) return;
    if (targetIndex < 0 || targetIndex >= reelsPosts.length) return;

    isCoolingRef.current = true;
    setDirection(moveDirection);
    setNextIndex(targetIndex);
    setIsAnimating(true);

    animationTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(targetIndex);
      setNextIndex(null);
      setIsAnimating(false);
    }, ANIMATION_DURATION);

    cooldownTimeoutRef.current = setTimeout(() => {
      isCoolingRef.current = false;
    }, WHEEL_COOLDOWN);
  };

  const moveToNext = () => {
    if (currentIndex >= reelsPosts.length - 1) return;
    startTransition(currentIndex + 1, "down");
  };

  const moveToPrev = () => {
    if (currentIndex <= 0) return;
    startTransition(currentIndex - 1, "up");
  };

  useEffect(() => {
    if (!reelsPosts.length) return;

    if (currentIndex > reelsPosts.length - 1) {
      setCurrentIndex(0);
      setNextIndex(null);
      setIsAnimating(false);
    }
  }, [reelsPosts.length, currentIndex]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating || isCoolingRef.current) return;

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
  }, [isAnimating, currentIndex, reelsPosts.length]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      if (cooldownTimeoutRef.current) {
        clearTimeout(cooldownTimeoutRef.current);
      }
    };
  }, []);

  if (!reelsPosts.length) {
    return (
      <ReelsPageContainer>
        <EmptyState>표시할 릴스가 없습니다.</EmptyState>
      </ReelsPageContainer>
    );
  }

  const likeCount = currentPost?.likes?.length || 0;
  const commentCount = currentPost?.commentCount || 0;
  const shareCount = 0;
  const isBookmarked = currentPost?.isBookmarked || false;

  return (
    <ReelsPageContainer>
      <ReelsCenterArea>
        <ReelsStage>
          <ReelScene>
            <AnimatedReelLayer
              $role="current"
              $direction={direction}
              $isAnimating={isAnimating}
            >
              <ReelsViewer post={currentPost} />
            </AnimatedReelLayer>

            {incomingPost && (
              <AnimatedReelLayer
                $role="next"
                $direction={direction}
                $isAnimating={isAnimating}
              >
                <ReelsViewer post={incomingPost} />
              </AnimatedReelLayer>
            )}
          </ReelScene>

          <ReelsSideActions
            likeCount={likeCount}
            commentCount={commentCount}
            shareCount={shareCount}
            isBookmarked={isBookmarked}
          />
        </ReelsStage>
      </ReelsCenterArea>

      <ReelsNavButtons>
        <ReelsNavButton
          onClick={moveToPrev}
          disabled={currentIndex === 0 || isAnimating}
          aria-label="이전 릴스"
        >
          ↑
        </ReelsNavButton>

        <ReelsNavButton
          onClick={moveToNext}
          disabled={currentIndex === reelsPosts.length - 1 || isAnimating}
          aria-label="다음 릴스"
        >
          ↓
        </ReelsNavButton>
      </ReelsNavButtons>
    </ReelsPageContainer>
  );
};

export default Reels;
