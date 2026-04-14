import { createPortal } from "react-dom";
import {
  ConfirmOverlay,
  ConfirmModalBox,
  ConfirmProfileImage,
  ConfirmProfileImageFallback,
  ConfirmTitle,
  ConfirmDescription,
  ConfirmActionButton,
  ConfirmCancelButton,
} from "../../styles/features/follower.styles";

const ConfirmRemoveFollowerModal = ({
  open,
  user,
  onClose,
  onConfirm,
  loading,
}) => {
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

        <ConfirmTitle>팔로워를 삭제하시겠어요?</ConfirmTitle>

        <ConfirmDescription>
          {user.username}님은 회원님의 팔로워 리스트에서 삭제된 사실을 알 수
          없습니다.
        </ConfirmDescription>

        <ConfirmActionButton
          type="button"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "삭제 중..." : "삭제"}
        </ConfirmActionButton>

        <ConfirmCancelButton type="button" onClick={onClose} disabled={loading}>
          취소
        </ConfirmCancelButton>
      </ConfirmModalBox>
    </ConfirmOverlay>,
    modalRoot,
  );
};

export default ConfirmRemoveFollowerModal;
