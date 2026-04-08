import { createPortal } from "react-dom";
import styled from "styled-components";
import replyModalX from "../../assets/reply-modal-x.png";
import PostImage from "../postImage/PostImage";

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
  width: 50%;
`;

const ReplyModal = ({ open, onClose, images }) => {
  if (!open) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <ReplyModalXDiv>
        <img src={replyModalX} alt="reply-modal-x" />
      </ReplyModalXDiv>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <PostImageWrapper>
          <PostImage images={images} replyModal={true} />
        </PostImageWrapper>
      </ModalBox>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default ReplyModal;
