import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import replyModalX from "../../assets/reply-modal-x.png";
import PostImage from "../postImage/PostImage";
import { useReply } from "../../hooks/useReply";

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
  position: fixed;
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
  height: 95%;
  background-color: white;
  display: flex;
`;

const PostImageWrapper = styled.div`
  width: 55%;
`;
const ReplyWrapper = styled.div`
  width: 45%;
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

const ReplyModal = ({ open, onClose, post }) => {
  const { initComments, loadComments } = useReply();
  const postId = post.id;
  useEffect(() => {
    if (!postId) return;

    // 🔥 post 바뀔 때마다 초기화 + 첫 로딩
    initComments(postId);
    loadComments();
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
        </ReplyWrapper>
      </ModalBox>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default ReplyModal;
