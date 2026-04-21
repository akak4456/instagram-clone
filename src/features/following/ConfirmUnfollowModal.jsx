import { createPortal } from "react-dom";
import {
  ConfirmOverlay,
  ConfirmModalBox,
  ConfirmProfileImage,
  ConfirmProfileImageFallback,
  ConfirmDescription,
  ConfirmActionButton,
  ConfirmCancelButton,
} from "../../styles/features/follower.styles";

const ConfirmUnfollowModal = ({ open, user, onClose, onConfirm, loading }) => {
  if (!open || !user) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <ConfirmOverlay onClick={onClose}>
      <ConfirmModalBox onClick={(e) => e.stopPropagation()}>
        {user.profileImage ? (
          <ConfirmProfileImage src={user.profileImage} alt={user.username} />
        ) : (
          <ConfirmProfileImageFallback />
        )}

        <ConfirmDescription>
          {user.username}님의 팔로우를 취소하시겠어요?
        </ConfirmDescription>

        <ConfirmActionButton
          type="button"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "처리 중..." : "팔로우 취소"}
        </ConfirmActionButton>

        <ConfirmCancelButton type="button" onClick={onClose} disabled={loading}>
          취소
        </ConfirmCancelButton>
      </ConfirmModalBox>
    </ConfirmOverlay>,
    modalRoot,
  );
};

export default ConfirmUnfollowModal;
