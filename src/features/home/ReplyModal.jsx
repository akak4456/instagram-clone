import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import replyModalX from "../../assets/reply-modal-x.png";
import PostImage from "../../components/postImage/PostImage";
import { useReply } from "../../hooks/useReply";
import ReplyItem from "./ReplyItem";
import replyModalPlus from "../../assets/reply-modal-plus.png";
import Spinner from "../../components/spinner/Spinner";

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

const ReplyModal = ({ open, onClose, post }) => {
  const postId = post.id;
  const { comments, initComments, loadComments, replyLoading } =
    useReply(postId);

  useEffect(() => {
    if (!postId) return;
    initComments(postId);
  }, [postId]);
  if (!open) return null;

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
              <Ring>
                <Inner>
                  <Profile src={post.user.profileImage} />
                </Inner>
              </Ring>
              <Username>{post.user.username}</Username>
              <Username>•</Username>
              <Follow>팔로우</Follow>
            </ReplyTopLeft>
            <More>•••</More>
          </ReplyTopDiv>
          <ReplyMiddleDiv>
            {comments.map((comment) => (
              <ReplyItem comment={comment} key={comment.id} />
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
          <ReplyBottomDiv>Reply Bottom</ReplyBottomDiv>
        </ReplyWrapper>
      </ModalBox>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default ReplyModal;
