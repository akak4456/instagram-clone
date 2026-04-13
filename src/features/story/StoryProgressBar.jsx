import {
  ProgressBarRow,
  ProgressTrack,
  ProgressFill,
} from "../../styles/features/story.styles";

const StoryProgressBar = ({
  images,
  storyId,
  currentImageIndex,
  progressPercent,
}) => {
  return (
    <ProgressBarRow>
      {images.map((_, imageIndex) => {
        let width = 0;

        if (imageIndex < currentImageIndex) {
          width = 100;
        } else if (imageIndex === currentImageIndex) {
          width = progressPercent;
        }

        return (
          <ProgressTrack key={`${storyId}-${imageIndex}`}>
            <ProgressFill $width={width} />
          </ProgressTrack>
        );
      })}
    </ProgressBarRow>
  );
};

export default StoryProgressBar;
