import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import uploadImages from "../../assets/upload-images.png";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { usePost } from "../../hooks/usePost";
import ProfileImage from "../../components/profileImage/ProfileImage";

const MAX_FILES = 10;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  width: ${({ hasFiles }) => (hasFiles ? "55%" : "40%")};
  height: 80vh;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease;
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const Icon = styled.div`
  img {
    width: 80px;
  }
`;

const Text = styled.div`
  font-size: 20px;
`;

const Button = styled.button`
  background-color: #4a5cff;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  padding: 16px;
`;

const PreviewItemWrapper = styled.div`
  position: relative;
`;

const PreviewItem = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const RemoveBtn = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const AddMoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  height: 120px;
  cursor: pointer;
`;

const Left = styled.div`
  flex: 7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  flex: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ShareBtn = styled.div`
  position: absolute;
  right: 24px;
  color: #3752e5;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const RightTitle = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Username = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const Caption = styled.textarea`
  margin: 0 16px;
  padding: 12px;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  height: 120px;
  overflow-y: auto;
`;

/**
 * File -> Data URL(base64) 변환
 * localStorage 에 저장 가능한 문자열로 만들기 위해 사용
 */
const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });

const UploadModal = ({ open, onClose }) => {
  const { user } = useAuth();
  const { addPost } = usePost();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (!open) {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
      setFiles([]);
      setCaption("");
    }
  }, [open]);

  if (!open) return null;

  const handleFiles = async (fileList) => {
    let newFiles = Array.from(fileList);

    newFiles = newFiles.filter((file) => file.type.startsWith("image/"));

    if (files.length + newFiles.length > MAX_FILES) {
      alert(`최대 ${MAX_FILES}개까지 업로드 가능합니다.`);
      return;
    }

    const mapped = await Promise.all(
      newFiles.map(async (file) => {
        const preview = URL.createObjectURL(file); // 현재 세션 미리보기용
        const dataUrl = await fileToDataUrl(file); // localStorage 저장용

        return {
          file,
          preview,
          dataUrl,
        };
      }),
    );

    setFiles((prev) => [...prev, ...mapped]);
  };

  const handleChange = async (e) => {
    await handleFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    await handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();

  const removeFile = (index) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleShare = async () => {
    if (files.length === 0) return;

    // preview(blob:)가 아니라 dataUrl(base64)을 저장해야
    // 새로고침/재로그인 후에도 이미지가 유지됨
    const images = files.map((f) => f.dataUrl);

    await addPost({ user, images, caption });
    onClose();
  };

  return createPortal(
    <>
      <Overlay
        onClick={() => {
          if (files.length > 0) {
            setConfirmOpen(true);
          } else {
            onClose();
          }
        }}
      >
        <ModalBox
          hasFiles={files.length > 0}
          onClick={(e) => e.stopPropagation()}
        >
          <Header>
            새 게시물 만들기
            {files.length > 0 && (
              <ShareBtn onClick={handleShare}>공유하기</ShareBtn>
            )}
          </Header>

          <Content onDragOver={handleDragOver} onDrop={handleDrop}>
            {files.length > 0 ? (
              <>
                <Left>
                  <PreviewGrid>
                    {files.map((item, index) => (
                      <PreviewItemWrapper key={index}>
                        <PreviewItem
                          src={item.preview}
                          alt={`preview-${index}`}
                        />
                        <RemoveBtn onClick={() => removeFile(index)}>
                          ✕
                        </RemoveBtn>
                      </PreviewItemWrapper>
                    ))}

                    {files.length < MAX_FILES && (
                      <AddMoreBox onClick={() => inputRef.current.click()}>
                        +
                      </AddMoreBox>
                    )}
                  </PreviewGrid>
                </Left>

                <Right>
                  <RightTitle>
                    <ProfileImage user={user} />
                    <Username>{user.username}</Username>
                  </RightTitle>

                  <Caption
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="문구를 입력하세요..."
                  />
                </Right>
              </>
            ) : (
              <DropZone onClick={() => inputRef.current.click()}>
                <Icon>
                  <img src={uploadImages} alt="upload-images" />
                </Icon>
                <Text>사진을 여기에 끌어다 놓으세요</Text>
                <Button>컴퓨터에서 선택</Button>
              </DropZone>
            )}
          </Content>
        </ModalBox>
      </Overlay>

      <input
        type="file"
        ref={inputRef}
        hidden
        multiple
        accept="image/*"
        onChange={handleChange}
      />

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
