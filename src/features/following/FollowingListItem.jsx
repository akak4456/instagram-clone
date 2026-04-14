import {
  ItemContainer,
  LeftSection,
  ProfileImage,
  ProfileImageFallback,
  UserTextSection,
  UsernameRow,
  Username,
  UserIdText,
  RemoveButton,
} from "../../styles/features/follower.styles";

const FollowingListItem = ({ user, onFollowingClick }) => {
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
          </UsernameRow>
          <UserIdText>{user.name || user.userId}</UserIdText>
        </UserTextSection>
      </LeftSection>

      <RemoveButton type="button" onClick={onFollowingClick}>
        팔로잉
      </RemoveButton>
    </ItemContainer>
  );
};

export default FollowingListItem;
