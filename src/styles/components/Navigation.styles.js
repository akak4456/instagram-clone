import styled, { keyframes } from "styled-components";
const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-28px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const NavWrapper = styled.div`
  position: relative;
  z-index: 100;
`;

export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ $expanded }) => ($expanded ? "220px" : "80px")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 10px;
  transition: width 0.3s ease;
  box-sizing: border-box;
  background: white;
  z-index: 100;
`;

export const SearchPanelContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 110;
  background: white;
  border-right: 1px solid #dbdbdb;
  animation: ${slideInLeft} 0.28s ease;
`;

export const Top = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const TopLogo = styled.img`
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Bottom = styled.div`
  position: relative;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const MorePopup = styled.div`
  position: absolute;
  bottom: 60px;
  width: 220px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
`;

export const PopupItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 8px 0;
`;

export const Label = styled.span`
  margin-left: 16px;
  display: inline-block;
  white-space: nowrap;
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  max-width: ${({ $expanded }) => ($expanded ? "200px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
`;
