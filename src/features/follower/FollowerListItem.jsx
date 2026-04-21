import {
  ItemContainer,
  LeftSection,
  ProfileImage,
  ProfileImageFallback,
  UserTextSection,
  UsernameRow,
  Username,
  FollowBadge,
  UserIdText,
  RemoveButton,
  FollowButton,
} from "../../styles/features/follower.styles";

const FollowerListItem = ({
  user,
  isMyProfile,
  showFollowBadge,
  isFollowing,
  onRemoveClick,
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
            {isMyProfile && showFollowBadge && (
              <FollowBadge onClick={onFollowClick}>· 팔로우</FollowBadge>
            )}
          </UsernameRow>
          <UserIdText>{user.userId}</UserIdText>
        </UserTextSection>
      </LeftSection>

      {isMyProfile ? (
        <RemoveButton type="button" onClick={onRemoveClick}>
          삭제
        </RemoveButton>
      ) : isFollowing ? (
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

export default FollowerListItem;
