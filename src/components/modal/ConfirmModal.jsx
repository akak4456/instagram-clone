import { createPortal } from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // UploadModal보다 위
`;

const ModalBox = styled.div`
  width: 360px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
`;

const Title = styled.div`
  padding: 20px 16px 8px;
  font-weight: bold;
`;

const Description = styled.div`
  padding-bottom: 16px;
  color: gray;
  font-size: 14px;
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #f8f8f8;
  }

  &.danger {
    color: red;
    font-weight: bold;
  }
`;

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
