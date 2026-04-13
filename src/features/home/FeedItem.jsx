import { useState, useEffect, useRef } from "react";
import { usePost } from "../../hooks/usePost";
import styled from "styled-components";
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

const Wrapper = styled.div`
  width: 470px;
  border-radius: 8px;
  background: white;
  margin: 20px auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Username = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const Time = styled.div`
  color: #858b92;
  font-size: 14px;
`;

const More = styled.div`
  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
`;

const ActionLeft = styled.div`
  display: flex;
  gap: 20px;
`;

const ActionItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 8px;
    font-weight: 500;
    font-size: 14px;
  }
`;

const Caption = styled.div`
  padding: 4px 12px;
  font-size: 14px;
`;

const FeedItem = ({ post }) => {
  const { toggleLike, toggleBookmark } = usePost();
  const { user } = useAuth();

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
        <Left>
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
          <ActionItem onClick={handleLike}>
            <LikeIcon isLiked={isLiked} />
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
        <ActionItem onClick={() => toggleBookmark(post.id)}>
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
