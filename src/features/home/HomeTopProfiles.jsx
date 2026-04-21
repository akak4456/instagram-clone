import { useEffect } from "react";
import { useFollow } from "../../hooks/useFollow";
import profileArrowLeft from "../../assets/profile-arrow-left.png";
import profileArrowRight from "../../assets/profile-arrow-right.png";
import StoryModal from "../story/StoryModal";
import useScrollLock from "../../hooks/useScrollLock";
import { useStory } from "../../hooks/useStory";
import { useAuth } from "../../hooks/useAuth";
import ProfileImage from "../../components/ProfileImage";
import {
  HomeTopProfileWrapper,
  Arrow,
  Viewport,
  Track,
  StoryItem,
  EmptyState,
  EmptyText,
  EmptySubText,
  SkeletonTrack,
  SkeletonItem,
  SkeletonCircle,
  SkeletonText,
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
    followingLoading,
  } = useFollow();

  const offset = (ITEM_WIDTH + GAP) * PAGE_SIZE * page;

  const { isStoryOpen, openStory } = useStory();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser?.userId) return;
    fetchFollowingUsers(currentUser.userId);
  }, [currentUser?.userId, fetchFollowingUsers]);

  useScrollLock(isStoryOpen);

  return (
    <HomeTopProfileWrapper>
      {!followingLoading && (
        <Arrow visible={page > 0} onClick={prevPage}>
          <img src={profileArrowLeft} alt="profile-arrow-left" />
        </Arrow>
      )}

      <Viewport>
        {followingLoading ? (
          <SkeletonTrack>
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <SkeletonItem key={index}>
                <SkeletonCircle />
                <SkeletonText />
              </SkeletonItem>
            ))}
          </SkeletonTrack>
        ) : allFollowingUsers.length === 0 ? (
          <EmptyState>
            <EmptyText>팔로잉한 유저가 없습니다.</EmptyText>
            <EmptySubText>다른 유저를 팔로우해보세요 👀</EmptySubText>
          </EmptyState>
        ) : (
          <Track offset={offset}>
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
        )}
      </Viewport>

      {!followingLoading && (
        <Arrow visible={page + 1 < maxPage} onClick={nextPage}>
          <img src={profileArrowRight} alt="profile-arrow-right" />
        </Arrow>
      )}

      {isStoryOpen && <StoryModal />}
    </HomeTopProfileWrapper>
  );
};

export default HomeTopProfiles;
