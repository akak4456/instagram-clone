import styled, { keyframes, css } from "styled-components";

const likeAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.4);
  }
  60% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

export const LikeIconImg = styled.img`
  ${({ animate }) =>
    animate &&
    css`
      animation: ${likeAnimation} 0.3s ease;
    `}

  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;
