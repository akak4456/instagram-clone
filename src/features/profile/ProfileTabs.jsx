import {
  ProfileTabBar,
  ProfileTabButton,
} from "../../styles/features/profile.styles";
import profilePostsOn from "../../assets/profile-posts-on.png";
import profilePostsOff from "../../assets/profile-posts-off.png";
import profileReelsOn from "../../assets/profile-reels-on.png";
import profileReelsOff from "../../assets/profile-reels-off.png";
import profileBookmarkOn from "../../assets/profile-bookmark-on.png";
import profileBookmarkOff from "../../assets/profile-bookmark-off.png";
import profileTaggedOn from "../../assets/profile-tagged-on.png";
import profileTaggedOff from "../../assets/profile-tagged-off.png";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <ProfileTabBar>
      <ProfileTabButton
        $active={activeTab === "posts"}
        onClick={() => setActiveTab("posts")}
      >
        <img
          src={activeTab === "posts" ? profilePostsOn : profilePostsOff}
          alt="profile-posts-on"
        />
      </ProfileTabButton>

      <ProfileTabButton
        $active={activeTab === "reels"}
        onClick={() => setActiveTab("reels")}
      >
        <img
          src={activeTab === "reels" ? profileReelsOn : profileReelsOff}
          alt="profile-reels-off"
        />
      </ProfileTabButton>

      <ProfileTabButton
        $active={activeTab === "saved"}
        onClick={() => setActiveTab("saved")}
      >
        <img
          src={activeTab === "saved" ? profileBookmarkOn : profileBookmarkOff}
          alt="profile-bookmark-off"
        />
      </ProfileTabButton>

      <ProfileTabButton
        $active={activeTab === "tagged"}
        onClick={() => setActiveTab("tagged")}
      >
        <img
          src={activeTab === "tagged" ? profileTaggedOn : profileTaggedOff}
          alt="profile-tagged-off"
        />
      </ProfileTabButton>
    </ProfileTabBar>
  );
};

export default ProfileTabs;
