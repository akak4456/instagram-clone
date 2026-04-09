import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import replyModalX from "../../assets/reply-modal-x.png";
import uploadImages from "../../assets/upload-images.png";
import ConfirmModal from "../../components/modal/ConfirmModal";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

/* 🔥 핵심: 모달 박스 */
const ModalBox = styled.div`
  width: 40%;
  height: 80vh;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

/* 상단 헤더 */
const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

/* 닫기 버튼 */
const CloseBtn = styled.img`
  position: absolute;
  right: 16px;
  width: 18px;
  cursor: pointer;
`;

/* 콘텐츠 영역 */
const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* 드롭존 */
const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

/* 아이콘 */
const Icon = styled.div`
  font-size: 48px;
`;

/* 텍스트 */
const Text = styled.div`
  font-size: 20px;
`;

/* 버튼 */
const Button = styled.button`
  background-color: #4a5cff;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #3a4be0;
  }
`;

const UploadModal = ({ open, onClose }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!open) return null;

  return createPortal(
    <>
      <Overlay>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          {/* 🔥 Header */}
          <Header>
            새 게시물 만들기
            <CloseBtn src={replyModalX} onClick={() => setConfirmOpen(true)} />
          </Header>

          {/* 🔥 Content */}
          <Content>
            <DropZone>
              <Icon>
                <img src={uploadImages} alt="upload-images" />
              </Icon>
              <Text>사진과 동영상을 여기에 끌어다 놓으세요</Text>
              <Button>컴퓨터에서 선택</Button>
            </DropZone>
          </Content>
        </ModalBox>
      </Overlay>

      {/* 🔥 Confirm Modal */}
      {confirmOpen && (
        <ConfirmModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            onClose();
          }}
        />
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default UploadModal;
