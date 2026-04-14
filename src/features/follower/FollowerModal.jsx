import { createPortal } from "react-dom";
import { Overlay, ModalBox } from "../../styles/features/follower.styles";

const FollowerModal = ({ open, onClose }) => {
  if (!open) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}></ModalBox>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default FollowerModal;
