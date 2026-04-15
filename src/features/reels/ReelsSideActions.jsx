import {
  SideActionsContainer,
  SideActionItem,
  SideActionIcon,
  SideActionCount,
} from "../../styles/features/reels.styles";

const ReelsSideActions = ({
  likeCount = 0,
  commentCount = 0,
  shareCount = 0,
  isBookmarked = false,
}) => {
  return (
    <SideActionsContainer>
      <SideActionItem type="button">
        <SideActionIcon>좋아요</SideActionIcon>
        <SideActionCount>{likeCount}</SideActionCount>
      </SideActionItem>

      <SideActionItem type="button">
        <SideActionIcon>댓글</SideActionIcon>
        <SideActionCount>{commentCount}</SideActionCount>
      </SideActionItem>

      <SideActionItem type="button">
        <SideActionIcon>공유</SideActionIcon>
        <SideActionCount>{shareCount}</SideActionCount>
      </SideActionItem>

      <SideActionItem type="button">
        <SideActionIcon>{isBookmarked ? "저장됨" : "저장"}</SideActionIcon>
      </SideActionItem>
    </SideActionsContainer>
  );
};

export default ReelsSideActions;
