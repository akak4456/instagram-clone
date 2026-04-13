import { SectionHeader, SectionTitle, ClearAllButton } from "./search.styles";

const SearchSectionHeader = ({ title, showClearAll, onClearAll }) => {
  return (
    <SectionHeader>
      <SectionTitle>{title}</SectionTitle>
      {showClearAll && (
        <ClearAllButton type="button" onClick={onClearAll}>
          모두 지우기
        </ClearAllButton>
      )}
    </SectionHeader>
  );
};

export default SearchSectionHeader;
