import {
  SideCardOverlay,
  ProfileImage,
  CenterNameRow,
  Username,
  StoryTime,
} from "../../styles/features/story.styles";

const StorySideOverlay = ({ user, timeLabel, translateX, scale, zIndex }) => {
  return (
    <SideCardOverlay translateX={translateX} scale={scale} zIndex={zIndex}>
      <ProfileImage src={user.profileImage} alt={user.username} $large />
      <CenterNameRow>
        <Username $center>{user.username}</Username>
      </CenterNameRow>
      <StoryTime $center>{timeLabel}</StoryTime>
    </SideCardOverlay>
  );
};

export default StorySideOverlay;
