import styled from "styled-components";
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; /* 🔥 이게 핵심 */
`;

export const Viewport = styled.div`
  overflow: hidden;
  width: 886px; /* 80px * 8 + gap 고려 */
`;

export const Track = styled.div`
  display: flex;
  gap: 20px;
  transition: transform 0.4s ease;

  transform: translateX(${(p) => `-${p.offset}px`});
`;

export const StoryItem = styled.div`
  width: 80px;
  flex-shrink: 0;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
`;

export const Arrow = styled.button`
  width: 32px;
  height: 32px;
  background: white;
  border: none;
  outline: none;
  border-radius: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  visibility: ${(p) => (p.visible ? "visible" : "hidden")};
  margin-left: 8px;
  margin-right: 8px;

  &:hover {
    cursor: pointer;
  }
`;
