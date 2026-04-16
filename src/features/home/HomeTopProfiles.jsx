import { useState, useEffect } from "react";
import { useFollow } from "../../hooks/useFollow";
import profileArrowLeft from "../../assets/profile-arrow-left.png";
import profileArrowRight from "../../assets/profile-arrow-right.png";
import StoryModal from "../story/StoryModal";
import useScrollLock from "../../hooks/useScrollLock";
import { useStory } from "../../contexts/StoryContext";
import { useAuth } from "../../hooks/useAuth";
import ProfileImage from "../../components/ProfileImage";
import {
  HomeTopProfileWrapper,
  Arrow,
  Viewport,
  Track,
  StoryItem,
} from "../../styles/features/home.styles";

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
    fetchFollowingUsers(currentUser.userId);
  }, []);

  useScrollLock(isStoryOpen);
  return (
    <HomeTopProfileWrapper>
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
    </HomeTopProfileWrapper>
  );
};

export default HomeTopProfiles;
