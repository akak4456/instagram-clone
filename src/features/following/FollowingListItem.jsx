import {
  ItemContainer,
  LeftSection,
  ProfileImage,
  ProfileImageFallback,
  UserTextSection,
  UsernameRow,
  Username,
  UserIdText,
  FollowButton,
  RemoveButton,
} from "../../styles/features/follower.styles";

const FollowingListItem = ({
  user,
  isFollowing,
  onFollowClick,
  onFollowingClick,
  followLoading,
}) => {
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

      {isFollowing ? (
        <RemoveButton
          type="button"
          onClick={onFollowingClick}
          disabled={followLoading}
        >
          {followLoading ? "처리중" : "팔로잉"}
        </RemoveButton>
      ) : (
        <FollowButton
          type="button"
          onClick={onFollowClick}
          disabled={followLoading}
        >
          {followLoading ? "처리중" : "팔로우"}
        </FollowButton>
      )}
    </ItemContainer>
  );
};

export default FollowingListItem;
