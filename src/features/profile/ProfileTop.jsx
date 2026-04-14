import {
  ProfileTopContainer,
  ProfileHeader,
  ProfileImageWrapper,
  ProfileImage,
  ProfileImageFallback,
  ProfileInfoSection,
  ProfileTopRow,
  ProfileUsername,
  ProfileActionButtonRow,
  ProfileActionButton,
  ProfileStatsRow,
  ProfileStatItem,
  ProfileName,
  ProfileBio,
  ProfileTextSection,
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
          <ProfileTextSection>
            <ProfileTopRow>
              <ProfileUsername>{user.username}</ProfileUsername>
            </ProfileTopRow>

            <ProfileName>{user.name || user.username}</ProfileName>

            <ProfileStatsRow>
              <ProfileStatItem>
                게시물 <strong>{user.postsCount}</strong>
              </ProfileStatItem>
              <ProfileStatItem>
                팔로워 <strong>{user.followers.length}</strong>
              </ProfileStatItem>
              <ProfileStatItem>
                팔로우 <strong>{user.following.length}</strong>
              </ProfileStatItem>
            </ProfileStatsRow>

            <ProfileBio>{user.bio || ""}</ProfileBio>
          </ProfileTextSection>
        </ProfileInfoSection>
      </ProfileHeader>
      <ProfileActionButtonRow>
        <ProfileActionButton>프로필 편집</ProfileActionButton>
        <ProfileActionButton>보관된 스토리 보기</ProfileActionButton>
      </ProfileActionButtonRow>
    </ProfileTopContainer>
  );
};

export default ProfileTop;
