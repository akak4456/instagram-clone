import styled from "styled-components";

export const ProfilePageContainer = styled.div`
  width: 100%;
`;

export const ProfileLoadingText = styled.div`
  padding: 80px 20px;
  text-align: center;
`;

export const ProfileTopContainer = styled.div`
  max-width: 935px;
  margin: 0 auto;
  padding: 30px 20px 40px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 80px;
`;

export const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  flex-shrink: 0;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileImageFallback = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #efefef;
`;

export const ProfileInfoSection = styled.div`
  flex: 1;
`;

export const ProfileTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const ProfileUsername = styled.h2`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`;

export const ProfileActionButton = styled.button`
  border: none;
  background: #efefef;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export const ProfileStatsRow = styled.div`
  display: flex;
  gap: 36px;
  margin-bottom: 20px;
`;

export const ProfileStatItem = styled.div`
  font-size: 16px;

  strong {
    margin-right: 4px;
  }
`;

export const ProfileName = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const ProfileBio = styled.div`
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-line;
`;

export const ProfileBottomContainer = styled.div`
  max-width: 935px;
  margin: 0 auto;
`;

export const ProfileTabBar = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #dbdbdb;
`;

export const ProfileTabButton = styled.button`
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#000" : "#8e8e8e")};
  border-top: ${({ $active }) =>
    $active ? "1px solid #000" : "1px solid transparent"};
  margin-top: -1px;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
`;

export const ProfileGridItem = styled.div`
  aspect-ratio: 1 / 1;
  background: #efefef;
  overflow: hidden;
  cursor: pointer;
`;

export const ProfileGridImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ProfileEmptyText = styled.div`
  padding: 80px 20px;
  text-align: center;
  color: #8e8e8e;
  font-size: 14px;
`;
