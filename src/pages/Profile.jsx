import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import ProfileTop from "../features/profile/ProfileTop";
import ProfileBottom from "../features/profile/ProfileBottom";
import ProfileSkeleton from "../features/profile/ProfileSkeleton";
import {
  ProfilePageContainer,
  ProfileLoadingText,
} from "../styles/features/profile.styles";

const Profile = () => {
  const { userId } = useParams();
  const {
    getUser,
    getUserPosts,
    getUserReels,
    getUserSavedPosts,
    getUserTaggedPosts,
    loading,
  } = useUser();

  const [profileUser, setProfileUser] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [tabData, setTabData] = useState({
    posts: [],
    reels: [],
    saved: [],
    tagged: [],
  });

  const fetchProfileUser = useCallback(async () => {
    if (!userId) return;

    const result = await getUser(userId);
    if (result.success) {
      setProfileUser(result.user);
    } else {
      setProfileUser(null);
    }
  }, [userId, getUser]);

  useEffect(() => {
    fetchProfileUser();
  }, [fetchProfileUser]);

  useEffect(() => {
    const fetchTabData = async () => {
      if (!userId) return;

      let result;

      if (activeTab === "posts" && tabData.posts.length === 0) {
        result = await getUserPosts(userId);
        if (result.success) {
          setTabData((prev) => ({ ...prev, posts: result.posts }));
        }
      }

      if (activeTab === "reels" && tabData.reels.length === 0) {
        result = await getUserReels(userId);
        if (result.success) {
          setTabData((prev) => ({ ...prev, reels: result.reels }));
        }
      }

      if (activeTab === "saved" && tabData.saved.length === 0) {
        result = await getUserSavedPosts(userId);
        if (result.success) {
          setTabData((prev) => ({ ...prev, saved: result.posts }));
        }
      }

      if (activeTab === "tagged" && tabData.tagged.length === 0) {
        result = await getUserTaggedPosts(userId);
        if (result.success) {
          setTabData((prev) => ({ ...prev, tagged: result.posts }));
        }
      }
    };

    fetchTabData();
  }, [
    userId,
    activeTab,
    tabData.posts.length,
    tabData.reels.length,
    tabData.saved.length,
    tabData.tagged.length,
    getUserPosts,
    getUserReels,
    getUserSavedPosts,
    getUserTaggedPosts,
  ]);

  const isProfileLoading = loading.getUser && !profileUser;

  const isTabLoading =
    (activeTab === "posts" && loading.getUserPosts) ||
    (activeTab === "reels" && loading.getUserReels) ||
    (activeTab === "saved" && loading.getUserSavedPosts) ||
    (activeTab === "tagged" && loading.getUserTaggedPosts);

  if (isProfileLoading) {
    return (
      <ProfilePageContainer>
        <ProfileSkeleton />
      </ProfilePageContainer>
    );
  }

  if (!profileUser) {
    return <ProfileLoadingText>사용자를 찾을 수 없습니다.</ProfileLoadingText>;
  }

  return (
    <ProfilePageContainer>
      <ProfileTop user={profileUser} refreshProfileUser={fetchProfileUser} />
      <ProfileBottom
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabData={tabData}
        isLoading={isTabLoading}
      />
    </ProfilePageContainer>
  );
};

export default Profile;
