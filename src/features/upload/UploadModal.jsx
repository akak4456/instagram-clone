import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import ConfirmModal from "../../components/ConfirmModal";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import { fileToDataUrl } from "../../utils/fileUtils";
import UploadEmptyState from "./UploadEmptyState";
import UploadPreviewSection from "./UploadPreviewSection";
import {
  Overlay,
  ModalBox,
  Header,
  ShareBtn,
  Content,
} from "./UploadModal.styles";

const MAX_FILES = 10;

const UploadModal = ({ open, onClose }) => {
  const { user } = useAuth();
  const { addPost } = usePost();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
      setFiles([]);
      setCaption("");
    }
  }, [open]);

  if (!open) return null;

  const openFileSelector = () => {
    inputRef.current?.click();
  };

  const handleFiles = async (fileList) => {
    let newFiles = Array.from(fileList);
    newFiles = newFiles.filter((file) => file.type.startsWith("image/"));

    if (files.length + newFiles.length > MAX_FILES) {
      alert(`최대 ${MAX_FILES}개까지 업로드 가능합니다.`);
      return;
    }

    const mappedFiles = await Promise.all(
      newFiles.map(async (file) => {
        const preview = URL.createObjectURL(file);
        const dataUrl = await fileToDataUrl(file);

        return {
          file,
          preview,
          dataUrl,
        };
      }),
    );

    setFiles((prev) => [...prev, ...mappedFiles]);
  };

  const handleInputChange = async (e) => {
    await handleFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    await handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleShare = async () => {
    if (files.length === 0) return;

    const images = files.map((fileItem) => fileItem.dataUrl);

    await addPost({
      user,
      images,
      caption,
    });

    onClose();
  };

  const handleOverlayClick = () => {
    if (files.length > 0) {
      setConfirmOpen(true);
      return;
    }

    onClose();
  };

  return createPortal(
    <>
      <Overlay onClick={handleOverlayClick}>
        <ModalBox
          $hasFiles={files.length > 0}
          onClick={(e) => e.stopPropagation()}
        >
          <Header>
            새 게시물 만들기
            {files.length > 0 && (
              <ShareBtn type="button" onClick={handleShare}>
                공유하기
              </ShareBtn>
            )}
          </Header>

          <Content onDragOver={handleDragOver} onDrop={handleDrop}>
            {files.length > 0 ? (
              <UploadPreviewSection
                files={files}
                maxFiles={MAX_FILES}
                user={user}
                caption={caption}
                onRemoveFile={handleRemoveFile}
                onAddMore={openFileSelector}
                onChangeCaption={setCaption}
              />
            ) : (
              <UploadEmptyState onSelectClick={openFileSelector} />
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
        onChange={handleInputChange}
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
