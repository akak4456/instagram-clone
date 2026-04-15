import {
  ReelCard,
  ReelMediaArea,
  ReelMediaImage,
  ReelMediaText,
  ReelBottomOverlay,
  ReelUserRow,
  ReelProfileCircle,
  ReelUsername,
  ReelCaption,
} from "../../styles/features/reels.styles";
import { useNavigate } from "react-router-dom";

const ReelCardContent = ({ post }) => {
  const username = post?.user?.username || post?.userId || "unknown";
  const caption = post?.caption || "설명이 없습니다.";
  const imageUrl = post?.images?.[0];
  const profileImage = post?.user?.profileImage;
  const userId = post?.user?.userId;
  const navigate = useNavigate();

  return (
    <ReelCard>
      <ReelMediaArea>
        {imageUrl ? (
          <ReelMediaImage src={imageUrl} alt={`Reel ${post.id}`} />
        ) : (
          <>
            <ReelMediaText>Reel #{post?.id}</ReelMediaText>
            <ReelMediaText>이미지가 없습니다.</ReelMediaText>
          </>
        )}
      </ReelMediaArea>

      <ReelBottomOverlay>
        <ReelUserRow onClick={() => navigate("/profile/" + userId)}>
          <ReelProfileCircle $image={profileImage} />
          <ReelUsername>@{username}</ReelUsername>
        </ReelUserRow>

        <ReelCaption>{caption}</ReelCaption>
      </ReelBottomOverlay>
    </ReelCard>
  );
};

export default ReelCardContent;
