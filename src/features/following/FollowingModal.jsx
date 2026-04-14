import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useUser } from "../../hooks/useUser";
import useDebounce from "../../hooks/useDebounce";
import FollowingListItem from "./FollowingListItem";
import ConfirmUnfollowModal from "./ConfirmUnfollowModal";
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

const FollowingModal = ({
  open,
  onClose,
  following = [],
  currentUserId,
  onRemoved,
}) => {
  const { unfollowUser } = useUser();

  const [keyword, setKeyword] = useState("");
  const [selectedFollowingUser, setSelectedFollowingUser] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(false);

  const debouncedKeyword = useDebounce(keyword, 300);

  const filteredFollowing = useMemo(() => {
    const trimmed = debouncedKeyword.trim().toLowerCase();

    if (!trimmed) return following;

    return following.filter((user) => {
      const userId = user.userId?.toLowerCase() || "";
      const username = user.username?.toLowerCase() || "";

      return userId.includes(trimmed) || username.includes(trimmed);
    });
  }, [following, debouncedKeyword]);

  const handleOpenConfirmModal = (followingUser) => {
    setSelectedFollowingUser(followingUser);
  };

  const handleCloseConfirmModal = () => {
    if (removeLoading) return;
    setSelectedFollowingUser(null);
  };

  const handleConfirmUnfollow = async () => {
    if (!selectedFollowingUser || removeLoading) return;

    setRemoveLoading(true);

    const result = await unfollowUser({
      currentUserId,
      targetUserId: selectedFollowingUser.userId,
    });

    if (result.success) {
      await onRemoved?.();
      setSelectedFollowingUser(null);
    } else {
      alert(result.message || "팔로잉 취소에 실패했습니다.");
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
              <ModalTitle>팔로잉</ModalTitle>
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
              {filteredFollowing.length > 0 ? (
                filteredFollowing.map((followingUser) => (
                  <FollowingListItem
                    key={followingUser.userId}
                    user={followingUser}
                    onFollowingClick={() =>
                      handleOpenConfirmModal(followingUser)
                    }
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

      <ConfirmUnfollowModal
        open={!!selectedFollowingUser}
        user={selectedFollowingUser}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmUnfollow}
        loading={removeLoading}
      />
    </>
  );
};

export default FollowingModal;
