import {
  SideActionsContainer,
  SideActionItem,
  SideActionIcon,
  SideActionCount,
} from "../../styles/features/reels.styles";

const ReelsSideActions = ({
  likeCount,
  commentCount,
  shareCount,
  isBookmarked,
}) => {
  return (
    <SideActionsContainer>
      <SideActionItem>
        <SideActionIcon>좋아요</SideActionIcon>
        <SideActionCount>{likeCount}</SideActionCount>
      </SideActionItem>

      <SideActionItem>
        <SideActionIcon>댓글</SideActionIcon>
        <SideActionCount>{commentCount}</SideActionCount>
      </SideActionItem>

      <SideActionItem>
        <SideActionIcon>공유</SideActionIcon>
        <SideActionCount>{shareCount}</SideActionCount>
      </SideActionItem>

      <SideActionItem>
        <SideActionIcon>{isBookmarked ? "북마크됨" : "북마크"}</SideActionIcon>
      </SideActionItem>
    </SideActionsContainer>
  );
};

export default ReelsSideActions;
