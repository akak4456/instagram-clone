import { ProfileTabBar, ProfileTabButton } from "./profile.styles";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <ProfileTabBar>
      <ProfileTabButton
        $active={activeTab === "posts"}
        onClick={() => setActiveTab("posts")}
      ></ProfileTabButton>

      <ProfileTabButton
        $active={activeTab === "reels"}
        onClick={() => setActiveTab("reels")}
      ></ProfileTabButton>

      <ProfileTabButton
        $active={activeTab === "saved"}
        onClick={() => setActiveTab("saved")}
      ></ProfileTabButton>

      <ProfileTabButton
        $active={activeTab === "tagged"}
        onClick={() => setActiveTab("tagged")}
      ></ProfileTabButton>
    </ProfileTabBar>
  );
};

export default ProfileTabs;
