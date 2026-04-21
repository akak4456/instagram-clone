import styled, { keyframes } from "styled-components";

export const ProfilePageContainer = styled.div`
  width: 100%;
`;

export const ProfileLoadingText = styled.div`
  padding: 80px 20px;
  text-align: center;
`;

export const ProfileTopContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 30px 20px 40px;
`;

export const ProfileHeader = styled.div`
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  align-items: start;
  column-gap: 28px;
  margin-bottom: 24px;
`;

export const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  justify-self: center;
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
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const ProfileTextSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProfileTopRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

export const ProfileUsername = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
`;

export const ProfileName = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 18px;
`;

export const ProfileStatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;

export const ProfileStatItem = styled.div`
  font-size: 14px;
  line-height: 1.4;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};

  strong {
    margin-left: 4px;
  }
`;

export const ProfileBio = styled.div`
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-line;
`;

export const ProfileActionButtonRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const ProfileActionButton = styled.button`
  width: 100%;
  min-width: 0;
  height: 42px;
  border: none;
  background: #efefef;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #e7eaee;
  }
`;

export const ProfileBottomContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const ProfileTabBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
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
  border-bottom: ${({ $active }) =>
    $active ? "2px solid #000" : "2px solid transparent"};
  margin-top: -1px;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
`;

export const ProfileGridItem = styled.div`
  aspect-ratio: 9 / 16;
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

const skeletonShimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

export const SkeletonBlock = styled.div`
  width: ${({ width = "100%" }) => width};
  height: ${({ height = "16px" }) => height};
  margin: ${({ margin = "0" }) => margin};
  border-radius: ${({ radius = "8px" }) => radius};
  background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: ${skeletonShimmer} 1.4s ease infinite;
`;

export const SkeletonCircle = styled(SkeletonBlock)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
