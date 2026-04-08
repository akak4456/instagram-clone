import { createPortal } from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ReplyModal = ({ open, onClose }) => {
  if (!open) return null;

  return createPortal(
    <Overlay onClick={onClose}></Overlay>,
    document.getElementById("modal-root"),
  );
};

export default ReplyModal;
