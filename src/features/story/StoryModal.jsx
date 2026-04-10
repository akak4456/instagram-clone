import { createPortal } from "react-dom";
import styled from "styled-components";
import storyModalX from "../../assets/story-modal-x.png";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const ModalXDiv = styled.div`
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

const StoryModal = ({ open, onClose, post }) => {
  if (!open) return null;
  return createPortal(
    <Overlay>
      <ModalXDiv>
        <img src={storyModalX} alt="reply-modal-x" onClick={onClose} />
      </ModalXDiv>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default StoryModal;
