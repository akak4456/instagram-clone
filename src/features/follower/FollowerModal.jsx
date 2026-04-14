import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import useDebounce from "../../hooks/useDebounce";
import FollowerListItem from "./FollowerListItem";
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

const FollowerModal = ({ open, onClose, followers = [] }) => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const filteredFollowers = useMemo(() => {
    const normalizedKeyword = debouncedKeyword.trim().toLowerCase();

    if (!normalizedKeyword) return followers;

    return followers.filter((follower) => {
      const userId = follower.userId?.toLowerCase() || "";
      const username = follower.username?.toLowerCase() || "";

      return (
        userId.includes(normalizedKeyword) ||
        username.includes(normalizedKeyword)
      );
    });
  }, [followers, debouncedKeyword]);

  if (!open) return null;

  return createPortal(
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
              <FollowerListItem key={follower.userId} user={follower} />
            ))
          ) : (
            <EmptyText>검색 결과가 없습니다.</EmptyText>
          )}
        </FollowerList>
      </ModalBox>
    </Overlay>,
    document.getElementById("modal-root"),
  );
};

export default FollowerModal;
