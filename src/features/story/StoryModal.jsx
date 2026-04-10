import { createPortal } from "react-dom";
import { Fragment } from "react";
import styled from "styled-components";
import { useStory } from "../../contexts/StoryContext";
import storyModalX from "../../assets/story-modal-x.png";
import storyInstagramLogo from "../../assets/story-instagram-logo.png";
import arrowLeft from "../../assets/left-arrow.png";
import arrowRight from "../../assets/right-arrow.png";
import { getTimeDiff } from "../../utils/timeUtils";

/* =======================
   Constants
======================= */
const ACTIVE_CARD_HEIGHT = "90vh";
const ACTIVE_CARD_WIDTH = "calc(90vh * 9 / 16)";
const CARD_RATIO = "9 / 16";
const CARD_SPACING = "48px";

const NAV_GAP = "8px";
const NAV_SIZE = "24px";

/* =======================
   Styled Components
======================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #1a1a1a;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalXDiv = styled.div`
  position: absolute;
  inset: 0;

  img {
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
    z-index: 100;
  }
`;

const StoryInstagramLogoDiv = styled.div`
  position: absolute;
  inset: 0;

  img {
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 100;
  }
`;

const StoryViewport = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: visible;
`;

const StoryCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: ${ACTIVE_CARD_HEIGHT};
  aspect-ratio: ${CARD_RATIO};
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  transform: translate(calc(-50% + ${({ translateX }) => translateX}), -50%)
    scale(${({ scale }) => scale});
  z-index: ${({ zIndex }) => zIndex};
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;
  box-shadow: ${({ active }) =>
    active ? "0 20px 60px rgba(0, 0, 0, 0.6)" : "none"};
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${({ $isActive }) =>
    $isActive ? "none" : "brightness(0.5) blur(2.5px)"};
  transition: filter 0.35s ease;
`;

const ActiveHeader = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  color: white;
  z-index: 20;
`;

const ActiveHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: ${({ $large }) => ($large ? "60px" : "32px")};
  height: ${({ $large }) => ($large ? "60px" : "32px")};
  border-radius: 50%;
  margin-right: ${({ $large }) => ($large ? "0" : "8px")};
  border: 2px solid white;
  object-fit: cover;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
`;

const Username = styled.span`
  font-weight: 600;
  font-size: ${({ $center }) => ($center ? "26px" : "14px")};
  line-height: 1.2;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
`;

const StoryTime = styled.span`
  margin-left: ${({ $center }) => ($center ? "0" : "8px")};
  margin-top: ${({ $center }) => ($center ? "8px" : "0")};
  font-size: ${({ $center }) => ($center ? "22px" : "14px")};
  font-weight: ${({ $center }) => ($center ? "700" : "400")};
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
`;

const SideCardOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: ${ACTIVE_CARD_HEIGHT};
  aspect-ratio: ${CARD_RATIO};
  transform: translate(calc(-50% + ${({ translateX }) => translateX}), -50%)
    scale(${({ scale }) => scale});
  z-index: ${({ zIndex }) => zIndex};
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const CenterNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
`;

const NavButtonsWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  &:hover button {
    background: white;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(120, 120, 120, 0.35);
  border: none;
  width: ${NAV_SIZE};
  height: ${NAV_SIZE};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
  pointer-events: auto;
  transition: background 0.2s ease;

  ${({ direction }) =>
    direction === "left"
      ? `left: calc(50% - (${ACTIVE_CARD_WIDTH} / 2) - ${NAV_SIZE} - ${NAV_GAP});`
      : `left: calc(50% + (${ACTIVE_CARD_WIDTH} / 2) + ${NAV_GAP});`}

  img {
    width: 10px;
    height: 10px;
  }
`;

/* =======================
   Helper Functions
======================= */

const getScale = (offset) => {
  if (offset === 0) return 1;
  return 0.5;
};

const getTranslateX = (offset) => {
  if (offset === 0) return "0px";

  const centerScale = getScale(0);
  const sideScale = getScale(1);

  const level1 = `calc((${ACTIVE_CARD_WIDTH} * ${centerScale}) / 2 + ${CARD_SPACING} + (${ACTIVE_CARD_WIDTH} * ${sideScale}) / 2)`;
  const level2 = `calc((${ACTIVE_CARD_WIDTH} * ${sideScale}) / 2 + ${CARD_SPACING} + (${ACTIVE_CARD_WIDTH} * ${sideScale}) / 2)`;

  if (offset === 1) return level1;
  if (offset === -1) return `calc(-1 * ${level1})`;

  if (offset === 2) return `calc(${level1} + ${level2})`;
  if (offset === -2) return `calc(-1 * (${level1} + ${level2}))`;

  return "0px";
};

const getZIndex = (offset) => {
  if (offset === 0) return 10;
  if (Math.abs(offset) === 1) return 6;
  if (Math.abs(offset) === 2) return 4;
  return 1;
};

/* =======================
   Component
======================= */

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

  if (!isStoryOpen) return null;

  const maxLeftVisible = Math.min(currentIndex, 2);
  const maxRightVisible = 2;

  return createPortal(
    <Overlay>
      <StoryInstagramLogoDiv>
        <img src={storyInstagramLogo} alt="story-instagram-logo" />
      </StoryInstagramLogoDiv>

      <ModalXDiv>
        <img src={storyModalX} alt="close" onClick={closeStory} />
      </ModalXDiv>

      <StoryViewport>
        {stories.map((story, index) => {
          const offset = index - activeLocalIndex;
          const isActive = index === activeLocalIndex;

          const shouldRender =
            offset >= -maxLeftVisible && offset <= maxRightVisible;

          if (!shouldRender) return null;

          const timeLabel = getTimeDiff(story.post.createdAt);

          return (
            <Fragment key={story.post.id}>
              <StoryCard
                active={isActive}
                translateX={getTranslateX(offset)}
                scale={getScale(offset)}
                zIndex={getZIndex(offset)}
              >
                <StoryImage
                  src={story.post.images[0]}
                  alt={story.user.username}
                  $isActive={isActive}
                />

                {isActive && (
                  <ActiveHeader>
                    <ActiveHeaderLeft>
                      <ProfileImage
                        src={story.user.profileImage}
                        alt={story.user.username}
                      />
                      <Username>{story.user.username}</Username>
                      <StoryTime>{timeLabel}</StoryTime>
                    </ActiveHeaderLeft>
                  </ActiveHeader>
                )}
              </StoryCard>

              {!isActive && (
                <SideCardOverlay
                  translateX={getTranslateX(offset)}
                  scale={getScale(offset)}
                  zIndex={getZIndex(offset) + 1}
                >
                  <ProfileImage
                    src={story.user.profileImage}
                    alt={story.user.username}
                    $large
                  />
                  <CenterNameRow>
                    <Username $center>{story.user.username}</Username>
                  </CenterNameRow>
                  <StoryTime $center>{timeLabel}</StoryTime>
                </SideCardOverlay>
              )}
            </Fragment>
          );
        })}

        <NavButtonsWrapper>
          {hasPrev && (
            <NavButton direction="left" onClick={prevStory}>
              <img src={arrowLeft} alt="previous" />
            </NavButton>
          )}

          {hasNext && (
            <NavButton direction="right" onClick={nextStory}>
              <img src={arrowRight} alt="next" />
            </NavButton>
          )}
        </NavButtonsWrapper>
      </StoryViewport>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default StoryModal;
