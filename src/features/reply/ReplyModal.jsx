import { useEffect } from "react";
import { createPortal } from "react-dom";
import replyModalX from "../../assets/reply-modal-x.png";
import PostImage from "../../components/PostImage";
import { useReply } from "../../hooks/useReply";
import ReplyItem from "./ReplyItem";
import replyModalPlus from "../../assets/reply-modal-plus.png";
import Spinner from "../../components/Spinner";
import postComment from "../../assets/post-comment.png";
import postRepost from "../../assets/post-repost.png";
import postBookmark from "../../assets/post-bookmark.png";
import postSend from "../../assets/post-send.png";
import { useFeed } from "../../hooks/useFeed";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/timeUtils";
import CommentInput from "../../components/CommentInput";
import postBookmarkFill from "../../assets/post-bookmark-fill.png";
import ProfileImage from "../../components/ProfileImage";
import LikeIcon from "../../components/LikeIcon";
import {
  Overlay,
  ReplyModalXDiv,
  ModalBox,
  PostImageWrapper,
  ReplyWrapper,
  ReplyTopDiv,
  ReplyTopLeft,
  Username,
  Follow,
  More,
  ReplyMiddleDiv,
  ReplyModalPlusDiv,
  ReplyBottomDiv,
  Actions,
  ActionLeft,
  ActionItem,
  LikeCount,
  ReplyModalMeta,
} from "../../styles/features/reply.styles";

const ReplyModal = ({ open, onClose, post }) => {
  const postId = post.id;
  const { user } = useAuth();
  const userId = user.userId;
  const isLiked = post.likes.some((l) => l.userId === userId);
  const { toggleLike, toggleBookmark } = useFeed(userId);
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
                <ActionItem>
                  <LikeIcon isLiked={isLiked} onClick={handleLike} />
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
            <ReplyModalMeta>
              <span>{formatDate(post.createdAt)}</span>
            </ReplyModalMeta>
            <CommentInput postId={post.id} />
          </ReplyBottomDiv>
        </ReplyWrapper>
      </ModalBox>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default ReplyModal;
