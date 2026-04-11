// features/search/SearchPanel.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../../hooks/useUser";
import useDebounce from "../../hooks/useDebounce";

const Panel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 450px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #dbdbdb;
  box-sizing: border-box;
  z-index: 200;
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 28px;
  flex-shrink: 0;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  width: 28px;
  height: 28px;
  font-size: 32px;
  line-height: 1;
  color: #262626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.65;
  }
`;

const Title = styled.h2`
  margin: 8px 0 28px;
  font-size: 28px;
  font-weight: 700;
  color: #000;
  flex-shrink: 0;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 28px;
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 20px;
  background: #efefef;
  padding: 0 40px 0 14px;
  font-size: 14px;
  box-sizing: border-box;
  color: #262626;

  &::placeholder {
    color: #8e8e8e;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: #c7c7c7;
  color: #fff;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin-bottom: 18px;
  flex-shrink: 0;
`;

const ResultArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const EmptyBox = styled.div`
  height: 100%;
  min-height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8e8e8e;
  font-size: 14px;
  font-weight: 600;
`;

const SearchResultList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  background: #ddd;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Username = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #262626;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserId = styled.div`
  font-size: 14px;
  color: #8e8e8e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

const RecentItem = styled.div`
  padding: 10px 0;
  font-size: 14px;
  color: #262626;
  cursor: pointer;
`;

const SearchPanel = ({ open, onClose }) => {
  const { searchUsers } = useUser();

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [recentKeywords, setRecentKeywords] = useState([]);

  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("recentSearchKeywords") || "[]",
    );
    setRecentKeywords(saved);
  }, []);

  useEffect(() => {
    const runSearch = async () => {
      if (!debouncedKeyword.trim()) {
        setResults([]);
        return;
      }

      const data = await searchUsers(debouncedKeyword);
      setResults(data);
    };

    runSearch();
  }, [debouncedKeyword, searchUsers]);

  const handleClear = () => {
    setKeyword("");
    setResults([]);
  };

  const handleRecentClick = (value) => {
    setKeyword(value);
  };

  const handleSaveRecentKeyword = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const next = [
      trimmed,
      ...recentKeywords.filter((item) => item !== trimmed),
    ].slice(0, 10);

    setRecentKeywords(next);
    localStorage.setItem("recentSearchKeywords", JSON.stringify(next));
  };

  const handleClickUser = (user) => {
    handleSaveRecentKeyword(keyword);
    console.log("선택한 유저:", user);
  };

  if (!open) return null;

  return (
    <Panel>
      <TopBar>
        <CloseButton type="button" onClick={onClose}>
          ×
        </CloseButton>
      </TopBar>

      <Title>검색</Title>

      <SearchInputWrapper>
        <SearchInput
          placeholder="검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <ClearButton
          type="button"
          $visible={keyword.length > 0}
          onClick={handleClear}
        >
          ×
        </ClearButton>
      </SearchInputWrapper>

      {!keyword.trim() ? (
        <>
          <SectionTitle>최근 검색 항목</SectionTitle>

          <ResultArea>
            {recentKeywords.length === 0 ? (
              <EmptyBox>최근 검색 내역 없음.</EmptyBox>
            ) : (
              <SearchResultList>
                {recentKeywords.map((item, idx) => (
                  <RecentItem
                    key={`${item}-${idx}`}
                    onClick={() => handleRecentClick(item)}
                  >
                    {item}
                  </RecentItem>
                ))}
              </SearchResultList>
            )}
          </ResultArea>
        </>
      ) : (
        <ResultArea>
          <SearchResultList>
            {results.map((user) => (
              <SearchItemRow
                key={user.userId}
                onClick={() => handleClickUser(user)}
              >
                <ProfileImage src={user.profileImage} alt={user.username} />
                <UserInfo>
                  <Username>{user.userId}</Username>
                  <UserId>{user.username}</UserId>
                </UserInfo>
              </SearchItemRow>
            ))}

            {results.length === 0 && <EmptyBox>검색 결과가 없습니다.</EmptyBox>}
          </SearchResultList>
        </ResultArea>
      )}
    </Panel>
  );
};

export default SearchPanel;
