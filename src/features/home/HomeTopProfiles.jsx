import { useState, useEffect } from "react";
import { useFollow } from "../../hooks/useFollow";
import styled from "styled-components";
import profileArrowLeft from "../../assets/profile-arrow-left.png";
import profileArrowRight from "../../assets/profile-arrow-right.png";
import StoryModal from "../story/StoryModal";
import useScrollLock from "../../hooks/useScrollLock";
import { useStory } from "../../contexts/StoryContext";
import { useAuth } from "../../hooks/useAuth";
import ProfileImage from "../../components/profileImage/ProfileImage";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; /* 🔥 이게 핵심 */
`;

const Viewport = styled.div`
  overflow: hidden;
  width: 886px; /* 80px * 8 + gap 고려 */
`;

const Track = styled.div`
  display: flex;
  gap: 20px;
  transition: transform 0.4s ease;

  transform: translateX(${(p) => `-${p.offset}px`});
`;

const StoryItem = styled.div`
  width: 80px;
  flex-shrink: 0;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
`;

const Arrow = styled.button`
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

const HomeTopProfiles = () => {
  const ITEM_WIDTH = 80;
  const GAP = 20;
  const {
    allFollowingUsers,
    fetchFollowingUsers,
    PAGE_SIZE,
    nextPage,
    prevPage,
    page,
    maxPage,
  } = useFollow();
  const offset = (ITEM_WIDTH + GAP) * PAGE_SIZE * page;

  const { isStoryOpen, openStory } = useStory();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchFollowingUsers();
  }, []);

  useScrollLock(isStoryOpen);
  return (
    <Wrapper>
      <Arrow visible={page > 0} onClick={prevPage}>
        <img src={profileArrowLeft} alt="profile-arrow-left" />
      </Arrow>

      <Viewport>
        <Track page={page} offset={offset}>
          {allFollowingUsers.map((user, index) => (
            <StoryItem
              key={`${user.userId}-${index}`}
              onClick={() =>
                openStory({
                  currentUserId: currentUser.userId,
                  clickedUserId: user.userId,
                })
              }
            >
              <ProfileImage user={user} type="big" />
              <div>{user.username}</div>
            </StoryItem>
          ))}
        </Track>
      </Viewport>

      <Arrow visible={page + 1 < maxPage} onClick={nextPage}>
        <img src={profileArrowRight} alt="profile-arrow-right" />
      </Arrow>
      {isStoryOpen && <StoryModal />}
    </Wrapper>
  );
};

export default HomeTopProfiles;
