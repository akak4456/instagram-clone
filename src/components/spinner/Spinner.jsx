import styled, { keyframes, css } from "styled-components";

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const fade = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;

const SpinnerWrapper = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`;

const Bar = styled.div`
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

const Spinner = () => {
  return (
    <SpinnerWrapper>
      {Array.from({ length: 12 }).map((_, i) => (
        <Bar key={i} index={i} />
      ))}
    </SpinnerWrapper>
  );
};

export default Spinner;
