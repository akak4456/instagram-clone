import ProfileTabs from "./ProfileTabs";
import ProfilePostGrid from "./ProfilePostGrid";
import ProfileGridSkeleton from "./ProfileGridSkeleton";
import {
  ProfileBottomContainer,
  ProfileEmptyText,
} from "../../styles/features/profile.styles";

const ProfileBottom = ({ activeTab, setActiveTab, tabData, isLoading }) => {
  const getCurrentPosts = () => {
    if (activeTab === "posts") return tabData.posts;
    if (activeTab === "reels") return tabData.reels;
    if (activeTab === "saved") return tabData.saved;
    if (activeTab === "tagged") return tabData.tagged;
    return [];
  };

  const getEmptyText = () => {
    if (activeTab === "posts") return "게시물이 없습니다.";
    if (activeTab === "reels") return "릴스가 없습니다.";
    if (activeTab === "saved") return "저장된 게시물이 없습니다.";
    if (activeTab === "tagged") return "태그된 게시물이 없습니다.";
    return "";
  };

  const currentPosts = getCurrentPosts();

  return (
    <ProfileBottomContainer>
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {isLoading ? (
        <ProfileGridSkeleton count={10} />
      ) : currentPosts.length > 0 ? (
        <ProfilePostGrid posts={currentPosts} />
      ) : (
        <ProfileEmptyText>{getEmptyText()}</ProfileEmptyText>
      )}
    </ProfileBottomContainer>
  );
};

export default ProfileBottom;
