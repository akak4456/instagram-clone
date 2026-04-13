import { Fragment } from "react";
import { getTimeDiff } from "../../utils/timeUtils";
import {
  StoryViewportWrapper,
  StoryCard,
  StoryImage,
} from "../../styles/features/story.styles";
import { getScale, getTranslateX, getZIndex } from "../../utils/storyUtils";
import StoryProgressBar from "./StoryProgressBar";
import StoryActiveHeader from "./StoryActiveHeader";
import StorySideOverlay from "./StorySideOverlay";
import StoryNavButtons from "./StoryNavButtons";

const StoryViewport = ({
  stories,
  activeLocalIndex,
  currentIndex,
  activeImageSrc,
  currentImageIndex,
  progressPercent,
  isPaused,
  isMoreOpen,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onResetProgress,
  onTogglePause,
  onToggleMore,
  onCloseMore,
}) => {
  const maxLeftVisible = Math.min(currentIndex, 2);
  const maxRightVisible = 2;

  return (
    <StoryViewportWrapper>
      {stories.map((story, index) => {
        const offset = index - activeLocalIndex;
        const isActive = index === activeLocalIndex;

        const shouldRender =
          offset >= -maxLeftVisible && offset <= maxRightVisible;

        if (!shouldRender) return null;

        const timeLabel = getTimeDiff(story.post.createdAt);
        const previewImage = isActive
          ? activeImageSrc
          : (story.post.images?.[0] ?? "");

        return (
          <Fragment key={story.post.id}>
            <StoryCard
              active={isActive}
              translateX={getTranslateX(offset)}
              scale={getScale(offset)}
              zIndex={getZIndex(offset)}
            >
              <StoryImage
                src={previewImage}
                alt={story.user.username}
                $isActive={isActive}
              />

              {isActive && (
                <>
                  <StoryProgressBar
                    images={story.post.images ?? []}
                    storyId={story.post.id}
                    currentImageIndex={currentImageIndex}
                    progressPercent={progressPercent}
                  />

                  <StoryActiveHeader
                    user={story.user}
                    timeLabel={timeLabel}
                    isPaused={isPaused}
                    isMoreOpen={isMoreOpen}
                    onTogglePause={onTogglePause}
                    onToggleMore={onToggleMore}
                    onCloseMore={onCloseMore}
                  />
                </>
              )}
            </StoryCard>

            {!isActive && (
              <StorySideOverlay
                user={story.user}
                timeLabel={timeLabel}
                translateX={getTranslateX(offset)}
                scale={getScale(offset)}
                zIndex={getZIndex(offset) + 1}
              />
            )}
          </Fragment>
        );
      })}

      <StoryNavButtons
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentImageIndex={currentImageIndex}
        onPrev={async () => {
          await onPrev();
          onResetProgress();
        }}
        onNext={async () => {
          await onNext();
          onResetProgress();
        }}
      />
    </StoryViewportWrapper>
  );
};

export default StoryViewport;
