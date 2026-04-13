import {
  SearchInputWrapper,
  SearchInput,
  InputClearButton,
} from "./search.styles";

const SearchInputBar = ({ keyword, onChange, onClear }) => {
  return (
    <SearchInputWrapper>
      <SearchInput
        placeholder="검색"
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
      />
      <InputClearButton
        type="button"
        $visible={keyword.length > 0}
        onClick={onClear}
      >
        ×
      </InputClearButton>
    </SearchInputWrapper>
  );
};

export default SearchInputBar;
