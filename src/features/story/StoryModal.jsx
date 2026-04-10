import { createPortal } from "react-dom";
import styled from "styled-components";
import storyModalX from "../../assets/story-modal-x.png";
import storyInstagramLogo from "../../assets/story-instagram-logo.png";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #1a1a1a;
  z-index: 999;
`;
const ModalXDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  img {
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
  }
`;
const StoryInstagramLogoDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  img {
    position: absolute;
    top: 24px;
    left: 24px;
  }
`;

const StoryModal = ({ open, onClose, post }) => {
  if (!open) return null;
  return createPortal(
    <Overlay>
      <StoryInstagramLogoDiv>
        <img src={storyInstagramLogo} alt="story-instagram-logo" />
      </StoryInstagramLogoDiv>
      <ModalXDiv>
        <img src={storyModalX} alt="reply-modal-x" onClick={onClose} />
      </ModalXDiv>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default StoryModal;
