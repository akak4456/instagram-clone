import styled from "styled-components";
import {
  ACTIVE_CARD_HEIGHT,
  CARD_RATIO,
  ACTIVE_CARD_WIDTH,
  NAV_GAP,
  NAV_SIZE,
} from "../../utils/storyUtils";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #1a1a1a;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalXDiv = styled.div`
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

export const StoryInstagramLogoDiv = styled.div`
  position: absolute;
  inset: 0;

  img {
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 100;
  }
`;

export const StoryViewportWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: visible;
`;

export const StoryCard = styled.div`
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

export const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${({ $isActive }) =>
    $isActive ? "none" : "brightness(0.5) blur(2.5px)"};
  transition: filter 0.35s ease;
`;

export const ActiveHeader = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  z-index: 20;
`;

export const ActiveHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;

export const ActiveHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HeaderIconButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: white;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }
`;

export const MoreMenuWrap = styled.div`
  position: relative;
`;

export const MoreMenu = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  min-width: 140px;
  background: rgba(28, 28, 28, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
`;

export const MoreMenuItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: white;
  text-align: left;
  padding: 12px 14px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const ProfileImage = styled.img`
  width: ${({ $large }) => ($large ? "60px" : "32px")};
  height: ${({ $large }) => ($large ? "60px" : "32px")};
  border-radius: 50%;
  margin-right: ${({ $large }) => ($large ? "0" : "8px")};
  border: 2px solid white;
  object-fit: cover;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: ${({ $center }) => ($center ? "26px" : "14px")};
  line-height: 1.2;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
`;

export const StoryTime = styled.span`
  margin-left: ${({ $center }) => ($center ? "0" : "8px")};
  margin-top: ${({ $center }) => ($center ? "8px" : "0")};
  font-size: ${({ $center }) => ($center ? "22px" : "14px")};
  font-weight: ${({ $center }) => ($center ? "700" : "400")};
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
`;

export const SideCardOverlay = styled.div`
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

export const CenterNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
`;

export const NavButtonsWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  &:hover button {
    background: white;
  }
`;

export const NavButton = styled.button`
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

export const ProgressBarRow = styled.div`
  position: absolute;
  top: 10px;
  left: 16px;
  right: 16px;
  display: flex;
  gap: 6px;
  z-index: 30;
`;

export const ProgressTrack = styled.div`
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: white;
  border-radius: 999px;
  width: ${({ $width }) => `${$width}%`};
  transition: width 50ms linear;
`;
