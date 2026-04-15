import ReelsSideActions from "./ReelsSideActions";
import {
  ReelViewerWrapper,
  ReelCard,
  ReelMediaArea,
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

  return (
    <ReelViewerWrapper>
      <ReelCard $direction={direction}>
        <ReelMediaArea>
          <ReelMediaText>Reel #{post.id}</ReelMediaText>
          <ReelMediaText>이미지/영상 영역</ReelMediaText>
          <ReelMediaText>지금은 텍스트로만 구현</ReelMediaText>
        </ReelMediaArea>

        <ReelBottomOverlay>
          <ReelUserRow>
            <ReelProfileCircle />
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
