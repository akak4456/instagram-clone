import { useState } from "react";
import {
  SideActionsContainer,
  SideActionItem,
  SideActionIcon,
  SideActionCount,
} from "../../styles/features/reels.styles";
import LikeIcon from "../../components/LikeIcon";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import postComment from "../../assets/post-comment.png";
import ReplyModal from "../reply/ReplyModal";
import postRepost from "../../assets/post-repost.png";
import postBookmark from "../../assets/post-bookmark.png";
import postBookmarkFill from "../../assets/post-bookmark-fill.png";

const ReelsSideActions = ({
  post,
  likeCount = 0,
  commentCount = 0,
  isBookmarked = false,
}) => {
  const { user } = useAuth();
  const { toggleLike, toggleBookmark } = usePost();

  const [replyModalOpen, setReplyModalOpen] = useState(false);

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

      <SideActionItem type="button" onClick={() => setReplyModalOpen(true)}>
        <img src={postComment} alt="post-comment" />
        <SideActionCount>{commentCount}</SideActionCount>
      </SideActionItem>

      <SideActionItem type="button">
        <img src={postRepost} alt="post-repost" />
        <SideActionCount>100</SideActionCount>
      </SideActionItem>

      <SideActionItem
        type="button"
        onClick={() => toggleBookmark(post.id, userId)}
      >
        <img
          src={isBookmarked ? postBookmarkFill : postBookmark}
          alt="post-bookmark"
        />
      </SideActionItem>
      {replyModalOpen && (
        <ReplyModal
          key={post.id}
          open={replyModalOpen}
          onClose={() => {
            setReplyModalOpen(false);
          }}
          post={post}
        />
      )}
    </SideActionsContainer>
  );
};

export default ReelsSideActions;
