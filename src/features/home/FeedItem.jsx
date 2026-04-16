import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import postComment from "../../assets/post-comment.png";
import postRepost from "../../assets/post-repost.png";
import postSend from "../../assets/post-send.png";
import postBookmark from "../../assets/post-bookmark.png";
import ReplyModal from "../reply/ReplyModal";
import PostImage from "../../components/PostImage";
import { getTimeDiff } from "../../utils/timeUtils";
import { useAuth } from "../../hooks/useAuth";
import postBookmarkFill from "../../assets/post-bookmark-fill.png";
import useScrollLock from "../../hooks/useScrollLock";
import ProfileImage from "../../components/ProfileImage";
import LikeIcon from "../../components/LikeIcon";
import {
  Wrapper,
  Header,
  Left,
  Username,
  Time,
  More,
  Actions,
  ActionLeft,
  ActionItem,
  Caption,
} from "../../styles/features/home.styles";

const FeedItem = ({ post }) => {
  const { user } = useAuth();
  const { toggleLike, toggleBookmark } = usePost();
  const navigate = useNavigate();

  const userId = user.userId;
  const isLiked = post.likes.some((l) => l.userId === userId);
  const [replyModalOpen, setReplyModalOpen] = useState(false);

  useScrollLock(replyModalOpen);

  const handleLike = () => {
    toggleLike(post.id, userId);
  };
  return (
    <Wrapper>
      {/* Header */}
      <Header>
        <Left onClick={() => navigate("/profile/" + post.user.userId)}>
          <ProfileImage user={post.user} />
          <Username>{post.user.username}</Username>
          <Time>• {getTimeDiff(post.createdAt)}</Time>
        </Left>
        <More>•••</More>
      </Header>

      {/* Image */}
      <PostImage images={post.images} />

      {/* Actions */}
      <Actions>
        <ActionLeft>
          <ActionItem>
            <LikeIcon isLiked={isLiked} onClick={handleLike} />
            <span>{post.likes.length}</span>
          </ActionItem>
          <ActionItem onClick={() => setReplyModalOpen(true)}>
            <img src={postComment} alt="post-comment" />
            <span>{post.commentCount}</span>
          </ActionItem>
          <ActionItem>
            <img src={postRepost} alt="post-repost" />
            <span>100</span>
          </ActionItem>
          <ActionItem>
            <img src={postSend} alt="post-send" />
          </ActionItem>
        </ActionLeft>
        <ActionItem onClick={() => toggleBookmark(post.id, userId)}>
          <img
            src={post.isBookmarked ? postBookmarkFill : postBookmark}
            alt="post-bookmark"
          />
        </ActionItem>
      </Actions>

      {/* Caption */}
      <Caption>
        <b>{post.user.username}</b> {post.caption}
      </Caption>
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
    </Wrapper>
  );
};

export default FeedItem;
