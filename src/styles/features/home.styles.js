import styled from "styled-components";
// FeedItem
export const Wrapper = styled.div`
  width: 470px;
  border-radius: 8px;
  background: white;
  margin: 20px auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const Username = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

export const Time = styled.div`
  color: #858b92;
  font-size: 14px;
`;

export const More = styled.div`
  cursor: pointer;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
`;

export const ActionLeft = styled.div`
  display: flex;
  gap: 20px;
`;

export const ActionItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 8px;
    font-weight: 500;
    font-size: 14px;
  }
`;

export const Caption = styled.div`
  padding: 4px 12px;
  font-size: 14px;
`;

// HomeTopProfiles

export const HomeTopProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; /* 🔥 이게 핵심 */
  margin-top: 30px;
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
