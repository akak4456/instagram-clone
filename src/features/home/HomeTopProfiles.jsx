import { useState, useEffect } from "react";
import { useFollow } from "../../hooks/useFollow";
import styled from "styled-components";
import profileArrowLeft from "../../assets/profile-arrow-left.png";
import profileArrowRight from "../../assets/profile-arrow-right.png";
import StoryModal from "../story/StoryModal";

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

const Ring = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(
    45deg,
    #feda75,
    #fa7e1e,
    #d62976,
    #962fbf,
    #4f5bd5
  );
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Profile = styled.div`
  width: calc(100% - 6px); /* 🔥 핵심 */
  height: calc(100% - 6px);
  border-radius: 50%;

  background: url(${(p) => p.src}) center/cover;
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

  const [storyModalOpen, setStoryModalOpen] = useState(false);

  useEffect(() => {
    fetchFollowingUsers();
  }, []);

  console.log(page, maxPage);
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
              onClick={() => setStoryModalOpen(true)}
            >
              <Ring>
                <Inner>
                  <Profile src={user.profileImage} />
                </Inner>
              </Ring>
              <div>{user.username}</div>
            </StoryItem>
          ))}
        </Track>
      </Viewport>

      <Arrow visible={page + 1 < maxPage} onClick={nextPage}>
        <img src={profileArrowRight} alt="profile-arrow-right" />
      </Arrow>
      {storyModalOpen && (
        <StoryModal
          open={storyModalOpen}
          onClose={() => setStoryModalOpen(false)}
        />
      )}
    </Wrapper>
  );
};

export default HomeTopProfiles;
