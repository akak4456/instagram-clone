import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
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
import reelsArrowUp from "../assets/reels-arrow-up.png";
import reelsArrowDown from "../assets/reels-arrow-down.png";

const ANIMATION_DURATION = 450;
const WHEEL_COOLDOWN = 700;
const PREFETCH_THRESHOLD = 2; // 마지막 2장 남았을 때 미리 로드

const Reels = () => {
  const { user } = useAuth();
  const { posts, loadPosts, hasMore, postLoading, resetPosts } = usePost(
    user.userId,
  );

  const userId = user.userId;

  useEffect(() => {
    resetPosts();
    loadPosts(userId);
  }, [userId]);

  const reelsPosts = posts ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [direction, setDirection] = useState("down");
  const [isAnimating, setIsAnimating] = useState(false);

  const isCoolingRef = useRef(false);
  const animationTimeoutRef = useRef(null);
  const cooldownTimeoutRef = useRef(null);

  // 같은 길이의 리스트에 대해 중복 prefetch 방지
  const prefetchedLengthRef = useRef(null);

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
      setCurrentIndex(Math.max(reelsPosts.length - 1, 0));
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
    if (!reelsPosts.length) return;
    if (!hasMore) return;
    if (postLoading) return;
    if (isAnimating) return;

    const triggerIndex = Math.max(reelsPosts.length - PREFETCH_THRESHOLD, 0);
    const shouldPrefetch = currentIndex >= triggerIndex;

    if (!shouldPrefetch) return;

    // 현재 posts 길이에 대해 이미 prefetch 했으면 재호출 방지
    if (prefetchedLengthRef.current === reelsPosts.length) return;

    prefetchedLengthRef.current = reelsPosts.length;
    loadPosts(userId);
  }, [
    currentIndex,
    reelsPosts.length,
    hasMore,
    postLoading,
    isAnimating,
    loadPosts,
  ]);

  // posts 길이가 실제로 늘어나면 다음 길이에 대해 다시 prefetch 가능하도록 유지
  // 별도 초기화 없이 "현재 길이 기준 1회" 방식으로 동작
  useEffect(() => {
    if (!reelsPosts.length) {
      prefetchedLengthRef.current = null;
    }
  }, [reelsPosts.length]);

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
        <ReelsCenterArea>
          <ReelsStage>
            <ReelScene>
              {postLoading ? (
                <ReelsViewer loading />
              ) : (
                <EmptyState>표시할 릴스가 없습니다.</EmptyState>
              )}
            </ReelScene>
          </ReelsStage>
        </ReelsCenterArea>
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
            post={currentPost}
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
          <img src={reelsArrowUp} alt="reels-arrow-up" />
        </ReelsNavButton>

        <ReelsNavButton
          onClick={moveToNext}
          disabled={currentIndex === reelsPosts.length - 1 || isAnimating}
          aria-label="다음 릴스"
        >
          <img src={reelsArrowDown} alt="reels-arrow-down" />
        </ReelsNavButton>
      </ReelsNavButtons>
    </ReelsPageContainer>
  );
};

export default Reels;
