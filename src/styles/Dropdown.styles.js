import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
export const Label = styled.span`
  position: absolute;
  left: 12px;
  top: ${({ active }) => (active ? "6px" : "50%")};
  transform: translateY(${({ active }) => (active ? "0" : "-50%")});
  font-size: ${({ active }) => (active ? "11px" : "14px")};
  color: ${({ active, error }) =>
    error ? "#ed4956" : active ? "#666" : "#999"};
  transition: all 0.2s ease;
  pointer-events: none;
  background: white;
  padding: 0 4px;
`;
export const Header = styled.div`
  position: relative;
  height: 48px; /* 🔥 고정 높이 */
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? "#ed4956" : "#ccc")};
  cursor: pointer;
  background: white;

  display: flex;
  align-items: center; /* 🔥 중앙 정렬 */
  justify-content: space-between;

  &:hover {
    border-color: ${({ error }) => (error ? "#ed4956" : "black")};
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    border-color: #0064e0;
  `}
`;

export const Value = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-left: 4px;
  margin-top: 8px; /* 🔥 label과 간격 */
`;

export const List = styled.ul`
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  margin-top: 4px;
  padding: 4px 0;

  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;

  max-height: 200px;
  overflow-y: hidden; /* 기본 숨김 */

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;

  &:hover {
    overflow-y: auto; /* hover 시 스크롤 가능 */
  }

  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
`;

export const Item = styled.li`
  padding: 2px; /* border와 background 사이 여백 */
  cursor: pointer;
  border-radius: 6px;
  box-sizing: border-box; /* border 포함 크기 계산 */

  border: ${({ selected }) =>
    selected ? "1px solid #0064e0" : "1px solid transparent"};
`;

// 내부 wrapper
export const ItemContent = styled.div`
  box-sizing: border-box;
  border-radius: 4px; /* 안쪽 배경 모서리 */
  background-color: ${({ selected }) => (selected ? "#404244" : "transparent")};
  color: ${({ selected }) => (selected ? "white" : "inherit")};
  padding: 10px 12px;
  transition: all 0.2s;
`;
