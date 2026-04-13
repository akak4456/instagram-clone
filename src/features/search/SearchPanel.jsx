import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import useDebounce from "../../hooks/useDebounce";
import {
  Panel,
  TopBar,
  CloseButton,
  Title,
} from "../../styles/features/search.styles";
import { RECENT_SEARCH_USERS_KEY } from "../../utils/searchUtils";
import {
  loadRecentUsers,
  saveRecentUsers,
  upsertRecentUser,
} from "../../utils/searchUtils";
import SearchInputBar from "./SearchInputBar";
import SearchSectionHeader from "./SearchSectionHeader";
import RecentSearchList from "./RecentSearchList";
import SearchResultList from "./SearchResultList";

const SearchPanel = ({ open, onClose }) => {
  const { searchUsers } = useUser();

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    setRecentUsers(loadRecentUsers(RECENT_SEARCH_USERS_KEY));
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

  const updateRecentUsers = (nextUsers) => {
    setRecentUsers(nextUsers);
    saveRecentUsers(RECENT_SEARCH_USERS_KEY, nextUsers);
  };

  const handleInputClear = () => {
    setKeyword("");
    setResults([]);
  };

  const handleSaveRecentUser = (user) => {
    const nextUsers = upsertRecentUser(recentUsers, user);
    updateRecentUsers(nextUsers);
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
    updateRecentUsers(nextUsers);
  };

  const handleClearAllRecentUsers = () => {
    updateRecentUsers([]);
  };

  if (!open) return null;

  const isSearching = keyword.trim().length > 0;

  return (
    <Panel>
      <TopBar>
        <CloseButton type="button" onClick={onClose}>
          ×
        </CloseButton>
      </TopBar>

      <Title>검색</Title>

      <SearchInputBar
        keyword={keyword}
        onChange={setKeyword}
        onClear={handleInputClear}
      />

      {!isSearching ? (
        <>
          <SearchSectionHeader
            title="최근 검색 항목"
            showClearAll={recentUsers.length > 0}
            onClearAll={handleClearAllRecentUsers}
          />

          <RecentSearchList
            users={recentUsers}
            onClickUser={handleClickRecentUser}
            onRemoveUser={handleRemoveRecentUser}
          />
        </>
      ) : (
        <SearchResultList users={results} onClickUser={handleClickSearchUser} />
      )}
    </Panel>
  );
};

export default SearchPanel;
