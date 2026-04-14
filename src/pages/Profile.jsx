import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import ProfileTop from "../features/profile/ProfileTop";
import ProfileBottom from "../features/profile/ProfileBottom";
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
  }, [userId, activeTab]);

  if (!profileUser) {
    return <ProfileLoadingText>로딩중...</ProfileLoadingText>;
  }

  return (
    <ProfilePageContainer>
      <ProfileTop user={profileUser} refreshProfileUser={fetchProfileUser} />
      <ProfileBottom
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabData={tabData}
      />
    </ProfilePageContainer>
  );
};

export default Profile;
