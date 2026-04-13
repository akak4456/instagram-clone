import { createPortal } from "react-dom";
import {
  Overlay,
  ModalBox,
  Content,
  Title,
  SubText,
  Divider,
  Button,
} from "../styles/components/Modal.styles";
const Modal = ({ open, onClose, title, subtext, buttontext }) => {
  if (!open) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Content>
          <Title>{title}</Title>
          <SubText>{subtext}</SubText>
        </Content>

        <Divider />

        <Button onClick={onClose}>{buttontext}</Button>
      </ModalBox>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
