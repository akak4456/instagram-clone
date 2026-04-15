import {
  SideActionsContainer,
  SideActionItem,
  SideActionIcon,
  SideActionCount,
} from "../../styles/features/reels.styles";
import LikeIcon from "../../components/LikeIcon";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";

const ReelsSideActions = ({
  post,
  likeCount = 0,
  commentCount = 0,
  shareCount = 0,
  isBookmarked = false,
}) => {
  const { user } = useAuth();
  const { toggleLike, toggleBookmark } = usePost();

  const userId = user.userId;
  const isLiked = post.likes.some((l) => l.userId === userId);

  const handleLike = () => {
    toggleLike(post.id, userId);
  };
  return (
    <SideActionsContainer>
      <SideActionItem type="button">
        <LikeIcon isLiked={isLiked} onClick={handleLike} />
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
