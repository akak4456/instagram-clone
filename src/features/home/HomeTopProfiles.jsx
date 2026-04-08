import { useEffect } from "react";
import { useFollow } from "../../hooks/useFollow";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Stories = styled.div`
  display: flex;
  gap: 12px;
`;

const StoryItem = styled.div`
  text-align: center;
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

const Profile = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: url(${(p) => p.src}) center/cover;
`;

const Username = styled.div`
  font-size: 12px;
  margin-top: 4px;
`;

const Arrow = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

const HomeTopProfiles = () => {
  const { visibleUsers, fetchFollowingUsers, nextPage, prevPage } = useFollow();

  useEffect(() => {
    fetchFollowingUsers();
  }, []);

  return (
    <Wrapper>
      <Arrow onClick={prevPage}>{"<"}</Arrow>

      <Stories>
        {visibleUsers.map((user, index) => (
          <StoryItem key={`${user.userId}-${index}`}>
            <Ring>
              <Profile src={user.profileImage} />
            </Ring>
            <Username>{user.username}</Username>
          </StoryItem>
        ))}
      </Stories>

      <Arrow onClick={nextPage}>{">"}</Arrow>
    </Wrapper>
  );
};

export default HomeTopProfiles;
