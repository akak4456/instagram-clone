import { useState } from "react";
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
import FollowerModal from "../follower/FollowerModal";
import FollowingModal from "../following/FollowingModal";
import useScrollLock from "../../hooks/useScrollLock";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

const ProfileTop = ({ user, refreshProfileUser }) => {
  const { user: currentUser } = useAuth();
  const { users } = useUser();
  const [followerModalOpen, setFollowerModalOpen] = useState(false);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);

  useScrollLock(followerModalOpen || followingModalOpen);

  const isMyProfile = user.userId === currentUser.userId;

  const currentUserData =
    users.find((item) => item.userId === currentUser.userId) || currentUser;

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
              <ProfileStatItem clickable={false}>
                게시물 <strong>{user.postsCount}</strong>
              </ProfileStatItem>

              <ProfileStatItem
                clickable
                onClick={() => setFollowerModalOpen(true)}
              >
                팔로워 <strong>{user.followers.length}</strong>
              </ProfileStatItem>

              <ProfileStatItem
                clickable
                onClick={() => setFollowingModalOpen(true)}
              >
                팔로우 <strong>{user.following.length}</strong>
              </ProfileStatItem>
            </ProfileStatsRow>

            <ProfileBio>{user.bio || ""}</ProfileBio>
          </ProfileTextSection>
        </ProfileInfoSection>
      </ProfileHeader>

      {isMyProfile && (
        <ProfileActionButtonRow>
          <ProfileActionButton>프로필 편집</ProfileActionButton>
          <ProfileActionButton>보관된 스토리 보기</ProfileActionButton>
        </ProfileActionButtonRow>
      )}

      {followerModalOpen && (
        <FollowerModal
          open={followerModalOpen}
          onClose={() => setFollowerModalOpen(false)}
          followers={user.followers}
          profileUserId={user.userId}
          currentUserId={currentUser.userId}
          currentUserFollowingIds={currentUserData.following || []}
          onRemoved={refreshProfileUser}
        />
      )}

      {followingModalOpen && (
        <FollowingModal
          open={followingModalOpen}
          onClose={() => setFollowingModalOpen(false)}
          following={user.following}
          profileUserId={user.userId}
          currentUserId={currentUser.userId}
          currentUserFollowingIds={currentUserData.following || []}
          onRemoved={refreshProfileUser}
        />
      )}
    </ProfileTopContainer>
  );
};

export default ProfileTop;
