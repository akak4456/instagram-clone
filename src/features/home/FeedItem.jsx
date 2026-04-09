import { useState, useEffect, useRef } from "react";
import { usePost } from "../../hooks/usePost";
import styled, { keyframes, css } from "styled-components";
import postLike from "../../assets/post-like.png";
import postComment from "../../assets/post-comment.png";
import postRepost from "../../assets/post-repost.png";
import postSend from "../../assets/post-send.png";
import postBookmark from "../../assets/post-bookmark.png";
import postLikeFill from "../../assets/post-like-fill.png";
import ReplyModal from "./ReplyModal";
import PostImage from "../../components/postImage/PostImage";
import { getTimeDiff } from "../../utils/timeUtils";
import { useAuth } from "../../hooks/useAuth";

const likeAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.4);
  }
  60% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

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

const Ring = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(
    45deg,
    #feda75,
    #fa7e1e,
    #d62976,
    #962fbf,
    #4f5bd5
  );
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Profile = styled.div`
  width: calc(100% - 4px); /* 🔥 핵심 */
  height: calc(100% - 4px);
  border-radius: 50%;
  background: url(${(p) => p.src}) center/cover;
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

const LikeIcon = styled.img`
  ${({ animate }) =>
    animate &&
    css`
      animation: ${likeAnimation} 0.3s ease;
    `}
`;

const FeedItem = ({ post }) => {
  const { toggleLike } = usePost();
  const { user } = useAuth();

  const userId = user.userId;
  const isLiked = post.likes.some((l) => l.userId === userId);
  const [animateLike, setAnimateLike] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      // 첫 렌더링일 때는 애니메이션 실행하지 않음
      firstRender.current = false;
      return;
    }
    setAnimateLike(true);
    const timer = setTimeout(() => setAnimateLike(false), 300);

    return () => clearTimeout(timer);
  }, [isLiked]);

  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (replyModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`; // 스크롤바 공간 확보
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [replyModalOpen]);

  const handleLike = () => {
    toggleLike(post.id, userId);
  };
  return (
    <Wrapper>
      {/* Header */}
      <Header>
        <Left>
          <Ring>
            <Inner>
              <Profile src={post.user.profileImage} />
            </Inner>
          </Ring>
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
            <LikeIcon
              src={isLiked ? postLikeFill : postLike}
              alt="post-like"
              animate={animateLike}
            />
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
        <ActionItem>
          <img src={postBookmark} alt="post-bookmark" />
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
