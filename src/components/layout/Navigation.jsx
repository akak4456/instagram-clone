import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/instagram-logo.png";
import homeOn from "../../assets/home-on.png";
import homeOff from "../../assets/home-off.png";
import storyOn from "../../assets/story-on.png";
import storyOff from "../../assets/story-off.png";
import search from "../../assets/search.png";
import upload from "../../assets/upload.png";
import hamburger from "../../assets/hamburger.png";

const NavContainer = styled.nav`
  position: fixed; /* 🔥 핵심 */
  width: ${({ $expanded }) => ($expanded ? "220px" : "80px")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 10px;
  transition: width 0.3s ease;
  box-sizing: border-box;
`;

const Top = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const TopLogo = styled.img`
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Bottom = styled.div`
  position: relative;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;

  text-decoration: none; /* 🔥 밑줄 제거 */
  color: inherit; /* 🔥 글자 색 유지 */

  &:hover {
    background-color: #f5f5f5;
  }
`;

const MorePopup = styled.div`
  position: absolute;
  bottom: 60px; /* NavItem 위에 뜨게 */
  width: 220px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
`;

const PopupItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 8px 0;
`;

const Label = styled.span`
  margin-left: 16px;
  display: inline-block;
  white-space: nowrap;

  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  max-width: ${({ $expanded }) => ($expanded ? "200px" : "0")};
  overflow: hidden;

  transition: all 0.3s ease;
`;

const Navigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [isHovered, setIsHovered] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const handleClick = () => setIsMoreOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  return (
    <NavContainer
      $expanded={isHovered || isMoreOpen} // 🔥 핵심
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Top>
        <Link to="/">
          <TopLogo src={logo} alt="instagram logo" />
        </Link>
      </Top>
      <Middle>
        <NavItem as={Link} to="/">
          <img src={pathname === "/" ? homeOn : homeOff} alt="home" />
          <Label $expanded={isHovered || isMoreOpen}>홈</Label>
        </NavItem>

        <NavItem as={Link} to="/story">
          <img src={pathname === "/story" ? storyOn : storyOff} alt="story" />
          <Label $expanded={isHovered || isMoreOpen}>릴스</Label>
        </NavItem>

        <NavItem>
          <img src={search} alt="search" />
          <Label $expanded={isHovered || isMoreOpen}>검색</Label>
        </NavItem>
        <NavItem>
          <img src={upload} alt="upload" />
          <Label $expanded={isHovered || isMoreOpen}>만들기</Label>
        </NavItem>
      </Middle>

      <Bottom>
        {isMoreOpen && (
          <MorePopup>
            <PopupItem>설정</PopupItem>
            <PopupItem>내 활동</PopupItem>
            <PopupItem>저장됨</PopupItem>
            <PopupItem>모드 전환</PopupItem>
            <PopupItem>문제 신고</PopupItem>

            <Divider />

            <PopupItem>계정 전환</PopupItem>
            <PopupItem>로그아웃</PopupItem>
          </MorePopup>
        )}
        <NavItem
          onClick={(e) => {
            e.stopPropagation(); // 🔥 핵심
            setIsMoreOpen((prev) => !prev);
          }}
        >
          <img src={hamburger} alt="hamburger" />
          <Label
            $expanded={isHovered || isMoreOpen}
            style={{ fontWeight: isMoreOpen ? "bold" : "normal" }}
          >
            더보기
          </Label>
        </NavItem>
      </Bottom>
    </NavContainer>
  );
};

export default Navigation;
