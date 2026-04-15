import styled, { keyframes, css } from "styled-components";

const slideUpIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDownIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

export const ReelViewerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const ReelCard = styled.div`
  position: relative;
  width: 480px;
  height: 95vh;
  border-radius: 8px;
  overflow: hidden;

  ${({ $direction }) =>
    $direction === "down"
      ? css`
          animation: ${slideUpIn} 0.45s ease;
        `
      : css`
          animation: ${slideDownIn} 0.45s ease;
        `}
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 18px;
  height: 760px;
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

export const ReelMediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 릴스처럼 화면을 꽉 채움 */
  display: block;
`;
