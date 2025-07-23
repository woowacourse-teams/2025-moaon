import SearchIcon from "@assets/icons/search.svg";
import * as S from "./SearchBar.styled";

interface SearchBarProps {
  width?: "full" | "fixed";
  shape?: "default" | "rounded";
  icon: {
    size: number;
    position: "left" | "right";
  };
}

function SearchBar({
  width = "full",
  shape = "default",
  icon,
}: SearchBarProps) {
  return (
    <S.SearchBox position={icon.position} shape={shape} width={width}>
      <S.SearchIcon src={SearchIcon} alt="검색" size={icon.size} />
      <S.SearchInput type="text" placeholder="검색어를 입력해 주세요" />
    </S.SearchBox>
  );
}

export default SearchBar;
