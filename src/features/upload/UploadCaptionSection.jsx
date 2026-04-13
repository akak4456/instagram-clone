import ProfileImage from "../../components/ProfileImage";
import { Right, RightTitle, Username, Caption } from "./UploadModal.styles";

const UploadCaptionSection = ({ user, caption, onChangeCaption }) => {
  return (
    <Right>
      <RightTitle>
        <ProfileImage user={user} />
        <Username>{user.username}</Username>
      </RightTitle>

      <Caption
        value={caption}
        onChange={(e) => onChangeCaption(e.target.value)}
        placeholder="문구를 입력하세요..."
      />
    </Right>
  );
};

export default UploadCaptionSection;
