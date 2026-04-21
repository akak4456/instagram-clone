import {
  ProfileTopContainer,
  ProfileHeader,
  ProfileImageWrapper,
  ProfileInfoSection,
  ProfileTextSection,
  ProfileTopRow,
  ProfileStatsRow,
  ProfileActionButtonRow,
  ProfileBottomContainer,
  ProfileTabBar,
  SkeletonBlock,
  SkeletonCircle,
  ProfileGrid,
  ProfileGridItem,
} from "../../styles/features/profile.styles";
import ProfileTabs from "./ProfileTabs";

const ProfileSkeleton = () => {
  return (
    <>
      <ProfileTopContainer>
        <ProfileHeader>
          <ProfileImageWrapper>
            <SkeletonCircle />
          </ProfileImageWrapper>

          <ProfileInfoSection>
            <ProfileTextSection>
              <ProfileTopRow>
                <SkeletonBlock width="140px" height="28px" />
              </ProfileTopRow>

              <SkeletonBlock width="100px" height="18px" margin="0 0 18px 0" />

              <ProfileStatsRow>
                <SkeletonBlock width="90px" height="18px" />
                <SkeletonBlock width="90px" height="18px" />
                <SkeletonBlock width="90px" height="18px" />
              </ProfileStatsRow>

              <SkeletonBlock width="220px" height="16px" margin="0 0 8px 0" />
              <SkeletonBlock width="180px" height="16px" />
            </ProfileTextSection>
          </ProfileInfoSection>
        </ProfileHeader>

        <ProfileActionButtonRow>
          <SkeletonBlock width="100%" height="42px" radius="10px" />
          <SkeletonBlock width="100%" height="42px" radius="10px" />
        </ProfileActionButtonRow>
      </ProfileTopContainer>

      <ProfileBottomContainer>
        <ProfileTabs activeTab="posts" setActiveTab={() => {}} />

        <ProfileGrid>
          {Array.from({ length: 10 }).map((_, index) => (
            <ProfileGridItem key={index}>
              <SkeletonBlock width="100%" height="100%" radius="0" />
            </ProfileGridItem>
          ))}
        </ProfileGrid>
      </ProfileBottomContainer>
    </>
  );
};

export default ProfileSkeleton;
