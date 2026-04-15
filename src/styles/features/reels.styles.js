import styled, { keyframes, css } from "styled-components";

const CARD_GAP = "2vh";
const CARD_WIDTH = "480px";
const CARD_HEIGHT = "96vh";
const SIDE_WIDTH = "72px";
const SCENE_WIDTH = `calc(${CARD_WIDTH} + 24px + ${SIDE_WIDTH})`;

const currentToUp = keyframes`
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(calc(-100% - ${CARD_GAP})) scale(0.985);
    opacity: 0.92;
  }
`;

const nextFromDown = keyframes`
  from {
    transform: translateY(calc(100% + ${CARD_GAP})) scale(1.015);
    opacity: 0.92;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const currentToDown = keyframes`
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(calc(100% + ${CARD_GAP})) scale(0.985);
    opacity: 0.92;
  }
`;

const nextFromUp = keyframes`
  from {
    transform: translateY(calc(-100% - ${CARD_GAP})) scale(1.015);
    opacity: 0.92;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

export const ReelsPageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ReelsCenterArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReelsStage = styled.div`
  width: ${SCENE_WIDTH};
  display: flex;
  align-items: flex-end;
  gap: 24px;
`;

export const ReelScene = styled.div`
  position: relative;
  width: ${CARD_WIDTH};
  height: 100vh;
  overflow: hidden;
  border-radius: 8px;
  flex-shrink: 0;
`;

export const AnimatedReelLayer = styled.div`
  position: absolute;
  height: ${CARD_HEIGHT};
  margin-top: ${CARD_GAP};
  inset: 0;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);

  ${({ $role, $direction, $isAnimating }) => {
    if (!$isAnimating) return "";

    if ($direction === "down") {
      if ($role === "current") {
        return css`
          animation: ${currentToUp} 0.45s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        `;
      }

      if ($role === "next") {
        return css`
          animation: ${nextFromDown} 0.45s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        `;
      }
    }

    if ($direction === "up") {
      if ($role === "current") {
        return css`
          animation: ${currentToDown} 0.45s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        `;
      }

      if ($role === "next") {
        return css`
          animation: ${nextFromUp} 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `;
      }
    }

    return "";
  }}
`;

export const ReelCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #111;
`;

export const ReelMediaArea = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #4a4a4a 0%, #1f1f1f 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

export const ReelMediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
`;

export const ReelMediaText = styled.div`
  text-align: center;
`;

export const ReelBottomOverlay = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px 18px 24px;
  color: white;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.72) 100%
  );
  box-sizing: border-box;
`;

export const ReelUserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const ReelProfileCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #d9d9d9;
  background-image: ${({ $image }) => ($image ? `url(${$image})` : "none")};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-shrink: 0;
`;

export const ReelUsername = styled.div`
  font-size: 15px;
  font-weight: 700;
`;

export const ReelCaption = styled.div`
  font-size: 14px;
  line-height: 1.45;
  word-break: break-word;
`;

export const SideActionsContainer = styled.div`
  width: ${SIDE_WIDTH};
  height: ${CARD_HEIGHT};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 18px;
  flex-shrink: 0;
  margin-bottom: ${CARD_GAP};
`;

export const SideActionItem = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0;
`;

export const SideActionIcon = styled.div`
  min-width: 58px;
  padding: 10px 8px;
  border-radius: 999px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
`;

export const SideActionCount = styled.div`
  font-size: 13px;
  color: #222;
  font-weight: 600;
`;

export const ReelsNavButtons = styled.div`
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ReelsNavButton = styled.button`
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  font-size: 24px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.06);
  }

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;

export const EmptyState = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #555;
`;
