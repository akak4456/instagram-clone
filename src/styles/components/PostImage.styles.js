import styled from "styled-components";

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ replyModal }) => (replyModal ? "100%" : "auto")};
  overflow: hidden;
  border-radius: ${({ replyModal }) => (replyModal ? "0" : "8px")};
`;

export const Slider = styled.div`
  display: flex;
  transform: translateX(${(p) => `-${p.index * 100}%`});
  transition: transform 0.3s ease;
  height: 100%; // 항상 부모 높이에 맞춤
`;

export const Slide = styled.img`
  min-width: 100%;
  height: ${({ replyModal }) => (replyModal ? "100%" : "auto")};
  object-fit: cover;
`;

export const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ left }) => (left ? "left: 10px;" : "right: 10px;")}

  width: 32px;
  height: 32px;

  background: white;
  border: none;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10;

  cursor: pointer;
  opacity: 0.7;
`;

export const Dots = styled.div`
  position: absolute;
  bottom: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

export const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "white" : "#ccc")};
`;
