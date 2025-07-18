import SearchIcon from "@assets/icons/search.svg";
import * as S from "./SearchBar.styled";

function SearchBar() {
  return (
    <S.SearchBox>
      <img src={SearchIcon} alt="검색" />
      <S.SearchInput type="text" placeholder="검색어를 입력해 주세요" />
    </S.SearchBox>
  );
}

export default SearchBar;
