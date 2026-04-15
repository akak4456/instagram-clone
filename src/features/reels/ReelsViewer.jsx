import ReelsSideActions from "./ReelsSideActions";
import {
  ReelViewerWrapper,
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

const ReelsViewer = ({ post, direction }) => {
  const username = post?.user?.username || post?.userId || "unknown";
  const caption = post?.caption || "설명이 없습니다.";
  const likeCount = post?.likes?.length || 0;
  const commentCount = post?.commentCount || 0;

  const imageUrl = post?.images?.[0];

  const profileImage = post?.user?.profileImage;

  return (
    <ReelViewerWrapper>
      <ReelCard $direction={direction}>
        <ReelMediaArea>
          {imageUrl ? (
            <ReelMediaImage src={imageUrl} alt={`Reel ${post.id}`} />
          ) : (
            <>
              <ReelMediaText>Reel #{post.id}</ReelMediaText>
              <ReelMediaText>이미지가 없습니다.</ReelMediaText>
            </>
          )}
        </ReelMediaArea>

        <ReelBottomOverlay>
          <ReelUserRow>
            <ReelProfileCircle $image={profileImage} />
            <ReelUsername>@{username}</ReelUsername>
          </ReelUserRow>

          <ReelCaption>{caption}</ReelCaption>
        </ReelBottomOverlay>
      </ReelCard>

      <ReelsSideActions
        likeCount={likeCount}
        commentCount={commentCount}
        shareCount={0}
        isBookmarked={post?.isBookmarked}
      />
    </ReelViewerWrapper>
  );
};

export default ReelsViewer;
