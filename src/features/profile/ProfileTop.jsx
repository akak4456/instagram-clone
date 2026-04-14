import {
  ProfileTopContainer,
  ProfileHeader,
  ProfileImageWrapper,
  ProfileImage,
  ProfileImageFallback,
  ProfileInfoSection,
  ProfileTopRow,
  ProfileUsername,
  ProfileActionButton,
  ProfileStatsRow,
  ProfileStatItem,
  ProfileName,
  ProfileBio,
} from "../../styles/features/profile.styles";

const ProfileTop = ({ user }) => {
  return (
    <ProfileTopContainer>
      <ProfileHeader>
        <ProfileImageWrapper>
          {user.profileImage ? (
            <ProfileImage src={user.profileImage} alt={user.username} />
          ) : (
            <ProfileImageFallback />
          )}
        </ProfileImageWrapper>

        <ProfileInfoSection>
          <ProfileTopRow>
            <ProfileUsername>{user.username}</ProfileUsername>
            <ProfileActionButton>프로필 편집</ProfileActionButton>
            <ProfileActionButton>보관된 스토리 보기</ProfileActionButton>
          </ProfileTopRow>

          <ProfileStatsRow>
            <ProfileStatItem>
              <strong>{user.postsCount}</strong> 게시물
            </ProfileStatItem>
            <ProfileStatItem>
              <strong>{user.followersCount}</strong> 팔로워
            </ProfileStatItem>
            <ProfileStatItem>
              <strong>{user.followingCount}</strong> 팔로우
            </ProfileStatItem>
          </ProfileStatsRow>

          <ProfileName>{user.name || user.username}</ProfileName>
          <ProfileBio>{user.bio || ""}</ProfileBio>
        </ProfileInfoSection>
      </ProfileHeader>
    </ProfileTopContainer>
  );
};

export default ProfileTop;
