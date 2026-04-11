// features/search/SearchPanel.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../../hooks/useUser";
import useDebounce from "../../hooks/useDebounce";

const RECENT_SEARCH_USERS_KEY = "recentSearchUsers";

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

const InputClearButton = styled.button`
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

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-shrink: 0;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #000;
`;

const ClearAllButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #3b49ff;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
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
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
`;

const SearchItemMain = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
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
  flex: 1;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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

const VerifiedBadge = styled.span`
  font-size: 14px;
  color: #0095f6;
  flex-shrink: 0;
`;

const UserMeta = styled.div`
  font-size: 14px;
  color: #8e8e8e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

const RemoveButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0 4px 0 8px;
  width: 24px;
  height: 24px;
  font-size: 28px;
  line-height: 1;
  color: #737373;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    opacity: 0.65;
  }
`;

const SearchPanel = ({ open, onClose }) => {
  const { searchUsers } = useUser();

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem(RECENT_SEARCH_USERS_KEY) || "[]",
    );
    setRecentUsers(saved);
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

  const saveRecentUsersToStorage = (nextUsers) => {
    setRecentUsers(nextUsers);
    localStorage.setItem(RECENT_SEARCH_USERS_KEY, JSON.stringify(nextUsers));
  };

  const handleInputClear = () => {
    setKeyword("");
    setResults([]);
  };

  const handleSaveRecentUser = (user) => {
    const recentUser = {
      userId: user.userId,
      username: user.username,
      profileImage: user.profileImage,
      isVerified: user.isVerified || false,
      meta: user.meta || user.bio || user.name || "",
    };

    const nextUsers = [
      recentUser,
      ...recentUsers.filter((item) => item.userId !== recentUser.userId),
    ].slice(0, 10);

    saveRecentUsersToStorage(nextUsers);
  };

  const handleClickSearchUser = (user) => {
    handleSaveRecentUser(user);
    console.log("선택한 유저:", user);
  };

  const handleClickRecentUser = (user) => {
    handleSaveRecentUser(user);
    console.log("최근 검색 유저 클릭:", user);
  };

  const handleRemoveRecentUser = (userId) => {
    const nextUsers = recentUsers.filter((item) => item.userId !== userId);
    saveRecentUsersToStorage(nextUsers);
  };

  const handleClearAllRecentUsers = () => {
    saveRecentUsersToStorage([]);
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
        <InputClearButton
          type="button"
          $visible={keyword.length > 0}
          onClick={handleInputClear}
        >
          ×
        </InputClearButton>
      </SearchInputWrapper>

      {!keyword.trim() ? (
        <>
          <SectionHeader>
            <SectionTitle>최근 검색 항목</SectionTitle>
            {recentUsers.length > 0 && (
              <ClearAllButton type="button" onClick={handleClearAllRecentUsers}>
                모두 지우기
              </ClearAllButton>
            )}
          </SectionHeader>

          <ResultArea>
            {recentUsers.length === 0 ? (
              <EmptyBox>최근 검색 내역 없음.</EmptyBox>
            ) : (
              <SearchResultList>
                {recentUsers.map((user) => (
                  <SearchItemRow key={user.userId}>
                    <SearchItemMain onClick={() => handleClickRecentUser(user)}>
                      <ProfileImage
                        src={user.profileImage}
                        alt={user.username}
                      />

                      <UserInfo>
                        <UsernameRow>
                          <Username>{user.userId}</Username>
                          {user.isVerified && <VerifiedBadge>✔</VerifiedBadge>}
                        </UsernameRow>

                        <UserMeta>{user.meta || user.username}</UserMeta>
                      </UserInfo>
                    </SearchItemMain>

                    <RemoveButton
                      type="button"
                      onClick={() => handleRemoveRecentUser(user.userId)}
                    >
                      ×
                    </RemoveButton>
                  </SearchItemRow>
                ))}
              </SearchResultList>
            )}
          </ResultArea>
        </>
      ) : (
        <ResultArea>
          <SearchResultList>
            {results.map((user) => (
              <SearchItemRow key={user.userId}>
                <SearchItemMain onClick={() => handleClickSearchUser(user)}>
                  <ProfileImage src={user.profileImage} alt={user.username} />

                  <UserInfo>
                    <UsernameRow>
                      <Username>{user.userId}</Username>
                      {user.isVerified && <VerifiedBadge>✔</VerifiedBadge>}
                    </UsernameRow>

                    <UserMeta>
                      {user.meta || user.bio || user.username}
                    </UserMeta>
                  </UserInfo>
                </SearchItemMain>
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
