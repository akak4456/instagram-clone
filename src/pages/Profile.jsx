import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import ProfileTop from "../features/profile/ProfileTop";
import ProfileBottom from "../features/profile/ProfileBottom";
import {
  ProfilePageContainer,
  ProfileLoadingText,
} from "../features/profile/profile.styles";

const Profile = () => {
  const { user: authUser } = useAuth();
  const {
    userLoading,
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

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (!authUser?.userId) return;

      const result = await getUser(authUser.userId);

      if (result.success) {
        setProfileUser(result.user);
      }
    };

    fetchProfileUser();
  }, [authUser]);

  useEffect(() => {
    const fetchTabData = async () => {
      if (!authUser?.userId) return;

      let result;

      if (activeTab === "posts") {
        result = await getUserPosts(authUser.userId);
        if (result.success) {
          setTabData((prev) => ({ ...prev, posts: result.posts }));
        }
      }

      if (activeTab === "reels") {
        result = await getUserReels(authUser.userId);
        if (result.success) {
          setTabData((prev) => ({ ...prev, reels: result.reels }));
        }
      }

      if (activeTab === "saved") {
        result = await getUserSavedPosts(authUser.userId);
        if (result.success) {
          setTabData((prev) => ({ ...prev, saved: result.posts }));
        }
      }

      if (activeTab === "tagged") {
        result = await getUserTaggedPosts(authUser.userId);
        if (result.success) {
          setTabData((prev) => ({ ...prev, tagged: result.posts }));
        }
      }
    };

    fetchTabData();
  }, [authUser, activeTab]);

  if (userLoading && !profileUser) {
    return <ProfileLoadingText>로딩중...</ProfileLoadingText>;
  }

  if (!profileUser) {
    return (
      <ProfileLoadingText>유저 정보를 찾을 수 없습니다.</ProfileLoadingText>
    );
  }

  return (
    <ProfilePageContainer>
      <ProfileTop user={profileUser} />
      <ProfileBottom
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabData={tabData}
      />
    </ProfilePageContainer>
  );
};

export default Profile;
