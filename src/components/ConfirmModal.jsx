import { createPortal } from "react-dom";
import {
  Overlay,
  ModalBox,
  Title,
  Description,
  Divider,
  Button,
} from "../styles/components/ConfirmModal.styles";

const ConfirmModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>게시물을 삭제하시겠어요?</Title>
        <Description>지금 나가면 수정 내용이 저장되지 않습니다.</Description>

        <Divider />
        <Button className="danger" onClick={onConfirm}>
          삭제
        </Button>

        <Divider />
        <Button onClick={onClose}>취소</Button>
      </ModalBox>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default ConfirmModal;
