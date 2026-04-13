import arrowLeft from "../../assets/left-arrow.png";
import arrowRight from "../../assets/right-arrow.png";
import {
  NavButtonsWrapper,
  NavButton,
} from "../../styles/features/story.styles";

const StoryNavButtons = ({
  hasPrev,
  hasNext,
  currentImageIndex,
  onPrev,
  onNext,
}) => {
  return (
    <NavButtonsWrapper>
      {(hasPrev || currentImageIndex > 0) && (
        <NavButton direction="left" onClick={onPrev}>
          <img src={arrowLeft} alt="previous" />
        </NavButton>
      )}

      {hasNext && (
        <NavButton direction="right" onClick={onNext}>
          <img src={arrowRight} alt="next" />
        </NavButton>
      )}
    </NavButtonsWrapper>
  );
};

export default StoryNavButtons;
