import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/instagram-logo.png";
import homeOn from "../assets/home-on.png";
import homeOff from "../assets/home-off.png";
import storyOn from "../assets/story-on.png";
import storyOff from "../assets/story-off.png";
import search from "../assets/search.png";
import upload from "../assets/upload.png";
import hamburger from "../assets/hamburger.png";
import UploadModal from "../features/upload/UploadModal";
import SearchPanel from "../features/search/SearchPanel";
import useScrollLock from "../hooks/useScrollLock";
import { useAuth } from "../hooks/useAuth";
import {
  NavWrapper,
  NavContainer,
  Top,
  TopLogo,
  Middle,
  NavItem,
  Label,
  Bottom,
  MorePopup,
  PopupItem,
  Divider,
  SearchPanelContainer,
  NavigationProfileWrapper,
  NavigationProfile,
} from "../styles/components/Navigation.styles";

const Navigation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  const [isHovered, setIsHovered] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    const handleClick = () => setIsMoreOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useScrollLock(uploadModalOpen);

  const isExpanded = isHovered || isMoreOpen;

  return (
    <NavWrapper>
      {!isSearchOpen && (
        <NavContainer
          $expanded={isExpanded}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Top>
            <Link to="/">
              <TopLogo src={logo} alt="instagram logo" />
            </Link>
          </Top>

          <Middle>
            <NavItem
              as={Link}
              to="/"
              onClick={() => {
                setIsMoreOpen(false);
              }}
            >
              <img src={pathname === "/" ? homeOn : homeOff} alt="home" />
              <Label $expanded={isExpanded} $active={pathname === "/"}>
                홈
              </Label>
            </NavItem>

            <NavItem
              as={Link}
              to="/reels"
              onClick={() => {
                setIsMoreOpen(false);
              }}
            >
              <img
                src={pathname === "/reels" ? storyOn : storyOff}
                alt="story"
              />
              <Label $expanded={isExpanded} $active={pathname === "/reels"}>
                릴스
              </Label>
            </NavItem>

            <NavItem
              onClick={() => {
                setIsSearchOpen(true);
                setIsMoreOpen(false);
                setIsHovered(false);
              }}
            >
              <img src={search} alt="search" />
              <Label $expanded={isExpanded} $active={false}>
                검색
              </Label>
            </NavItem>

            <NavItem
              onClick={() => {
                setUploadModalOpen(true);
                setIsMoreOpen(false);
              }}
            >
              <img src={upload} alt="upload" />
              <Label $expanded={isExpanded}>만들기</Label>
            </NavItem>
            <NavItem
              as={Link}
              to={`/profile/${user.userId}`}
              onClick={() => {
                setIsMoreOpen(false);
              }}
            >
              <NavigationProfileWrapper>
                <NavigationProfile src={user.profileImage} alt="profile" />
              </NavigationProfileWrapper>
              <Label
                $expanded={isExpanded}
                $active={pathname.startsWith("/profile/")}
              >
                프로필
              </Label>
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
                e.stopPropagation();
                setIsMoreOpen((prev) => !prev);
              }}
            >
              <img src={hamburger} alt="hamburger" />
              <Label $expanded={isExpanded} $active={isMoreOpen}>
                더보기
              </Label>
            </NavItem>
          </Bottom>

          {uploadModalOpen && (
            <UploadModal
              open={uploadModalOpen}
              onClose={() => setUploadModalOpen(false)}
            />
          )}
        </NavContainer>
      )}

      {isSearchOpen && (
        <SearchPanelContainer>
          <SearchPanel
            open={isSearchOpen}
            onClose={() => {
              setIsSearchOpen(false);
              setIsMoreOpen(false);
              setIsHovered(false);
            }}
          />
        </SearchPanelContainer>
      )}
    </NavWrapper>
  );
};

export default Navigation;
