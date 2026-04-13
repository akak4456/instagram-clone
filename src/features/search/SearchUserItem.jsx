import {
  SearchItemRow,
  SearchItemMain,
  ProfileImage,
  UserInfo,
  UsernameRow,
  Username,
  VerifiedBadge,
  UserMeta,
  RemoveButton,
} from "./search.styles";

const SearchUserItem = ({
  user,
  onClick,
  onRemove,
  showRemoveButton = false,
}) => {
  return (
    <SearchItemRow>
      <SearchItemMain onClick={() => onClick(user)}>
        <ProfileImage src={user.profileImage} alt={user.username} />

        <UserInfo>
          <UsernameRow>
            <Username>{user.userId}</Username>
            {user.isVerified && <VerifiedBadge>✔</VerifiedBadge>}
          </UsernameRow>

          <UserMeta>{user.meta || user.bio || user.username}</UserMeta>
        </UserInfo>
      </SearchItemMain>

      {showRemoveButton && (
        <RemoveButton type="button" onClick={() => onRemove(user.userId)}>
          ×
        </RemoveButton>
      )}
    </SearchItemRow>
  );
};

export default SearchUserItem;
