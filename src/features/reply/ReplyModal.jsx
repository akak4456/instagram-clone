import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import replyModalX from "../../assets/reply-modal-x.png";
import PostImage from "../../components/postImage/PostImage";
import { useReply } from "../../hooks/useReply";
import ReplyItem from "./ReplyItem";
import replyModalPlus from "../../assets/reply-modal-plus.png";
import Spinner from "../../components/spinner/Spinner";
import postComment from "../../assets/post-comment.png";
import postRepost from "../../assets/post-repost.png";
import postBookmark from "../../assets/post-bookmark.png";
import postSend from "../../assets/post-send.png";
import { usePost } from "../../hooks/usePost";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/timeUtils";
import CommentInput from "../../components/CommentInput";
import postBookmarkFill from "../../assets/post-bookmark-fill.png";
import ProfileImage from "../../components/profileImage/ProfileImage";
import LikeIcon from "../../components/LikeIcon";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const ReplyModalXDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  img {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
`;

const ModalBox = styled.div`
  position: fixed;
  width: 60%;
  height: 95vh;
  background-color: white;
  display: flex;
`;

const PostImageWrapper = styled.div`
  width: 55%;
`;
const ReplyWrapper = styled.div`
  width: 45%;
  display: flex;
  min-height: 0;
  flex-direction: column;
  height: 100%;
`;

const ReplyTopDiv = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
`;

const ReplyTopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Username = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const Follow = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #515ff8;

  &:hover {
    cursor: pointer;
    color: #4251d6;
  }
`;

const More = styled.div`
  cursor: pointer;
`;

const ReplyMiddleDiv = styled.div`
  flex: 1; /* 🔥 남은 영역 전부 차지 */
  min-height: 0;
  overflow-y: auto; /* 🔥 댓글 많을 때 스크롤 */
  /* 🔥 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const ReplyModalPlusDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  img {
    cursor: pointer;
  }
`;

const ReplyBottomDiv = styled.div``;

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

const LikeCount = styled.div`
  font-weight: 500;
  font-size: 14px;
  padding: 5px 10px;
`;

const Meta = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #8e8e8e;
  display: flex;
  gap: 12px;
  padding-left: 10px;
  padding-bottom: 8px;
`;

const ReplyModal = ({ open, onClose, post }) => {
  const postId = post.id;
  const { user } = useAuth();
  const userId = user.userId;
  const isLiked = post.likes.some((l) => l.userId === userId);
  const { toggleLike, toggleBookmark } = usePost();
  const { comments, initComments, loadComments, replyLoading } =
    useReply(postId);

  useEffect(() => {
    if (!postId) return;
    initComments(postId);
  }, [postId]);

  if (!open) return null;

  const handleLike = () => {
    toggleLike(post.id, userId);
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <ReplyModalXDiv>
        <img src={replyModalX} alt="reply-modal-x" />
      </ReplyModalXDiv>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <PostImageWrapper>
          <PostImage images={post.images} replyModal={true} />
        </PostImageWrapper>
        <ReplyWrapper>
          <ReplyTopDiv>
            <ReplyTopLeft>
              <ProfileImage user={post.user} />
              <Username>{post.user.username}</Username>
              <Username>•</Username>
              <Follow>팔로우</Follow>
            </ReplyTopLeft>
            <More>•••</More>
          </ReplyTopDiv>
          <ReplyMiddleDiv>
            {comments.map((comment) => (
              <ReplyItem postId={post.id} comment={comment} key={comment.id} />
            ))}
            <ReplyModalPlusDiv>
              {replyLoading ? (
                <Spinner />
              ) : (
                <img
                  src={replyModalPlus}
                  alt="reply-modal-plus"
                  onClick={() => loadComments(postId)}
                />
              )}
            </ReplyModalPlusDiv>
          </ReplyMiddleDiv>
          <ReplyBottomDiv>
            <Actions>
              <ActionLeft>
                <ActionItem onClick={handleLike}>
                  <LikeIcon isLiked={isLiked} />
                </ActionItem>
                <ActionItem>
                  <img src={postComment} alt="post-comment" />
                </ActionItem>
                <ActionItem>
                  <img src={postRepost} alt="post-repost" />
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
            <LikeCount>좋아요 {post.likes.length}개</LikeCount>
            <Meta>
              <span>{formatDate(post.createdAt)}</span>
            </Meta>
            <CommentInput postId={post.id} />
          </ReplyBottomDiv>
        </ReplyWrapper>
      </ModalBox>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default ReplyModal;
