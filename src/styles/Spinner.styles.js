import styled, { keyframes, css } from "styled-components";

const fade = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;

export const SpinnerWrapper = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`;

export const Bar = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 6px;
  background: #555;
  border-radius: 1px;
  transform-origin: center -8px;

  ${({ index }) => css`
    transform: rotate(${index * 30}deg);
    animation: ${fade} 1s linear infinite;
    animation-delay: ${index * 0.08}s;
  `}
`;
