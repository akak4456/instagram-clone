import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useUser } from "../../hooks/useUser";
import useDebounce from "../../hooks/useDebounce";
import FollowerListItem from "./FollowerListItem";
import ConfirmRemoveFollowerModal from "./ConfirmRemoveFollowerModal";
import {
  Overlay,
  ModalBox,
  ModalHeader,
  ModalTitle,
  CloseButton,
  SearchSection,
  SearchInputWrapper,
  SearchInput,
  FollowerList,
  EmptyText,
} from "../../styles/features/follower.styles";

const FollowerModal = ({
  open,
  onClose,
  followers = [],
  currentUserId,
  onRemoved,
}) => {
  const { removeFollower } = useUser();

  const [keyword, setKeyword] = useState("");
  const [selectedFollower, setSelectedFollower] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(false);

  const debouncedKeyword = useDebounce(keyword, 300);

  const filteredFollowers = useMemo(() => {
    const trimmed = debouncedKeyword.trim().toLowerCase();

    if (!trimmed) return followers;

    return followers.filter((user) => {
      const userId = user.userId?.toLowerCase() || "";
      const username = user.username?.toLowerCase() || "";

      return userId.includes(trimmed) || username.includes(trimmed);
    });
  }, [followers, debouncedKeyword]);

  const handleOpenConfirmModal = (follower) => {
    setSelectedFollower(follower);
  };

  const handleCloseConfirmModal = () => {
    if (removeLoading) return;
    setSelectedFollower(null);
  };

  const handleConfirmRemove = async () => {
    if (!selectedFollower || removeLoading) return;

    setRemoveLoading(true);

    const result = await removeFollower({
      currentUserId,
      followerUserId: selectedFollower.userId,
    });

    if (result.success) {
      await onRemoved?.();
      setSelectedFollower(null);
    } else {
      alert(result.message || "팔로워 삭제에 실패했습니다.");
    }

    setRemoveLoading(false);
  };

  if (!open) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return (
    <>
      {createPortal(
        <Overlay onClick={onClose}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>팔로워</ModalTitle>
              <CloseButton type="button" onClick={onClose}>
                ×
              </CloseButton>
            </ModalHeader>

            <SearchSection>
              <SearchInputWrapper>
                <SearchInput
                  type="text"
                  placeholder="검색"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </SearchInputWrapper>
            </SearchSection>

            <FollowerList>
              {filteredFollowers.length > 0 ? (
                filteredFollowers.map((follower) => (
                  <FollowerListItem
                    key={follower.userId}
                    user={follower}
                    onRemoveClick={() => handleOpenConfirmModal(follower)}
                  />
                ))
              ) : (
                <EmptyText>검색 결과가 없습니다.</EmptyText>
              )}
            </FollowerList>
          </ModalBox>
        </Overlay>,
        modalRoot,
      )}

      <ConfirmRemoveFollowerModal
        open={!!selectedFollower}
        user={selectedFollower}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmRemove}
        loading={removeLoading}
      />
    </>
  );
};

export default FollowerModal;
