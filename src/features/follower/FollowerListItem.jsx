import {
  ItemContainer,
  LeftSection,
  ProfileImage,
  ProfileImageFallback,
  UserTextSection,
  UsernameRow,
  Username,
  UserIdText,
  FollowBadge,
  RemoveButton,
} from "../../styles/features/follower.styles";

const FollowerListItem = ({ user }) => {
  return (
    <ItemContainer>
      <LeftSection>
        {user.profileImage ? (
          <ProfileImage src={user.profileImage} alt={user.username} />
        ) : (
          <ProfileImageFallback />
        )}

        <UserTextSection>
          <UsernameRow>
            <Username>{user.username}</Username>
            <FollowBadge>· 팔로우</FollowBadge>
          </UsernameRow>
          <UserIdText>{user.userId}</UserIdText>
        </UserTextSection>
      </LeftSection>

      <RemoveButton type="button">삭제</RemoveButton>
    </ItemContainer>
  );
};

export default FollowerListItem;
