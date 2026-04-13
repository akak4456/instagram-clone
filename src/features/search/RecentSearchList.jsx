import SearchUserItem from "./SearchUserItem";
import {
  ResultArea,
  EmptyBox,
  SearchResultList,
} from "../../styles/features/search.styles";

const RecentSearchList = ({ users, onClickUser, onRemoveUser }) => {
  return (
    <ResultArea>
      {users.length === 0 ? (
        <EmptyBox>최근 검색 내역 없음.</EmptyBox>
      ) : (
        <SearchResultList>
          {users.map((user) => (
            <SearchUserItem
              key={user.userId}
              user={user}
              onClick={onClickUser}
              onRemove={onRemoveUser}
              showRemoveButton
            />
          ))}
        </SearchResultList>
      )}
    </ResultArea>
  );
};

export default RecentSearchList;
