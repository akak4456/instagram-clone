import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useStory } from "../../contexts/StoryContext";
import storyModalX from "../../assets/story-modal-x.png";
import storyInstagramLogo from "../../assets/story-instagram-logo.png";
import arrowLeft from "../../assets/profile-arrow-left.png";
import arrowRight from "../../assets/profile-arrow-right.png";

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
  }
`;

const StoryInstagramLogoDiv = styled.div`
  position: absolute;
  inset: 0;
  img {
    position: absolute;
    top: 24px;
    left: 24px;
  }
`;

const StoryViewport = styled.div`
  position: relative;
  width: 420px;
  height: 720px;
  overflow: visible;
`;

const StoryTrack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StoryCard = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 420px;
  height: 720px;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  transform: translateX(${({ offset }) => offset * 340 - 210}px)
    scale(${({ active }) => (active ? 1 : 0.8)});
  opacity: ${({ active }) => (active ? 1 : 0.4)};
  z-index: ${({ active }) => (active ? 10 : 1)};
  transition:
    transform 0.35s ease,
    opacity 0.35s ease;
  box-shadow: ${({ active }) =>
    active ? "0 20px 60px rgba(0,0,0,0.6)" : "none"};
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ direction }) =>
    direction === "left" ? "left: -70px;" : "right: -70px;"}

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const StoryHeader = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  color: white;
  z-index: 20;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

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

  return createPortal(
    <Overlay>
      {/* Instagram Logo */}
      <StoryInstagramLogoDiv>
        <img src={storyInstagramLogo} alt="story-instagram-logo" />
      </StoryInstagramLogoDiv>

      {/* Close Button */}
      <ModalXDiv>
        <img src={storyModalX} alt="close" onClick={closeStory} />
      </ModalXDiv>

      {/* Story Viewport */}
      <StoryViewport>
        <StoryTrack>
          {stories.map((story, index) => {
            const offset = index - activeLocalIndex;
            const isActive = index === activeLocalIndex;

            const maxLeftVisible = Math.min(currentIndex, 2); // 첫 번째면 0, 두 번째 이상이면 1
            const maxRightVisible = 2; // 오른쪽은 최대 2개까지

            const shouldRender =
              offset >= -maxLeftVisible && offset <= maxRightVisible;

            if (!shouldRender) return null;

            return (
              <StoryCard key={story.post.id} offset={offset} active={isActive}>
                <StoryImage
                  src={story.post.images[0]}
                  alt={story.user.username}
                />

                {/* Header */}
                <StoryHeader>
                  <ProfileImage
                    src={story.user.profileImage}
                    alt={story.user.username}
                  />
                  <Username>{story.user.username}</Username>
                </StoryHeader>
              </StoryCard>
            );
          })}
        </StoryTrack>

        {/* Navigation Buttons */}
        {hasPrev && (
          <NavButton direction="left" onClick={() => prevStory()}>
            <img src={arrowLeft} alt="previous" />
          </NavButton>
        )}
        {hasNext && (
          <NavButton direction="right" onClick={() => nextStory()}>
            <img src={arrowRight} alt="next" />
          </NavButton>
        )}
      </StoryViewport>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default StoryModal;
