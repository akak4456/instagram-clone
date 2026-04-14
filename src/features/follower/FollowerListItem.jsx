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

const FollowerListItem = ({ user, onRemoveClick }) => {
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
          <UserIdText>{user.userId}</UserIdText>
        </UserTextSection>
      </LeftSection>

      <RemoveButton type="button" onClick={onRemoveClick}>
        삭제
      </RemoveButton>
    </ItemContainer>
  );
};

export default FollowerListItem;
