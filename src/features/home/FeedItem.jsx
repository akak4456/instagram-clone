import { useState, useEffect, useRef } from "react";
import { usePost } from "../../hooks/usePost";
import styled, { keyframes, css } from "styled-components";
import profileArrowLeft from "../../assets/profile-arrow-left.png";
import profileArrowRight from "../../assets/profile-arrow-right.png";
import postLike from "../../assets/post-like.png";
import postComment from "../../assets/post-comment.png";
import postRepost from "../../assets/post-repost.png";
import postSend from "../../assets/post-send.png";
import postBookmark from "../../assets/post-bookmark.png";
import postLikeFill from "../../assets/post-like-fill.png";

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

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;

const Slider = styled.div`
  display: flex;
  transform: translateX(${(p) => `-${p.index * 100}%`});
  transition: transform 0.3s ease;
`;

const Slide = styled.img`
  min-width: 100%;
  height: auto;
  object-fit: cover;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ left }) => (left ? "left: 10px;" : "right: 10px;")}

  width: 32px;
  height: 32px;

  background: white;
  border: none;
  border-radius: 50%;

  display: flex; /* 🔥 추가 */
  align-items: center; /* 🔥 세로 중앙 */
  justify-content: center; /* 🔥 가로 중앙 */

  z-index: 10;

  cursor: pointer;
  opacity: 0.7;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "white" : "#ccc")};
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

  const userId = post.user.userId;
  const isLiked = post.likes.some((l) => l.userId === userId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animateLike, setAnimateLike] = useState(false);

  const total = post.images.length;

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? prev : prev + 1));
  };
  const getTimeDiff = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);

    const diff = Math.floor((now - created) / 1000); // 초 단위

    if (diff < 60) return `${diff}초`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}일`;

    return `${Math.floor(diff / 604800)}주`;
  };

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

  const handleLike = () => {
    toggleLike(post.id, post.user.userId);
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
      <ImageContainer>
        <Slider index={currentIndex}>
          {post.images.map((img, idx) => (
            <Slide key={idx} src={img} />
          ))}
        </Slider>

        {/* 좌우 버튼 */}
        {currentIndex > 0 && (
          <Arrow left onClick={prev}>
            <img src={profileArrowLeft} alt="profile-arrow-left" />
          </Arrow>
        )}
        {currentIndex < total - 1 && (
          <Arrow onClick={next}>
            <img src={profileArrowRight} alt="profile-arrow-right" />
          </Arrow>
        )}

        {/* Dot */}
        {total > 1 && (
          <Dots>
            {post.images.map((_, idx) => (
              <Dot key={idx} active={idx === currentIndex} />
            ))}
          </Dots>
        )}
      </ImageContainer>

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
          <ActionItem>
            <img src={postComment} alt="post-comment" />
            <span>{post.comments.length}</span>
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
    </Wrapper>
  );
};

export default FeedItem;
