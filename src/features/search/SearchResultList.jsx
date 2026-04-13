import SearchUserItem from "./SearchUserItem";
import {
  ResultArea,
  EmptyBox,
  SearchResultList as List,
} from "../../styles/search.styles";

const SearchResultList = ({ users, onClickUser }) => {
  return (
    <ResultArea>
      <List>
        {users.map((user) => (
          <SearchUserItem key={user.userId} user={user} onClick={onClickUser} />
        ))}

        {users.length === 0 && <EmptyBox>검색 결과가 없습니다.</EmptyBox>}
      </List>
    </ResultArea>
  );
};

export default SearchResultList;
