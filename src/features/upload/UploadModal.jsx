import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import replyModalX from "../../assets/reply-modal-x.png";
import ConfirmModal from "../../components/modal/ConfirmModal";

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

const UploadModal = ({ open, onClose }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  if (!open) return null;

  return createPortal(
    <>
      <Overlay onClick={() => setConfirmOpen(true)}>
        <ReplyModalXDiv>
          <img src={replyModalX} alt="reply-modal-x" />
        </ReplyModalXDiv>
        <ModalBox onClick={(e) => e.stopPropagation()}></ModalBox>
      </Overlay>
      {confirmOpen && (
        <ConfirmModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            onClose(); // UploadModal 닫기
          }}
        />
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default UploadModal;
