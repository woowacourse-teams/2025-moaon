import SearchIcon from "@assets/icons/search.svg";
import { type ChangeEvent, useState } from "react";
import * as S from "./SearchBar.styled";

interface SearchBarProps {
  width?: "full" | "fixed";
  shape?: "default" | "rounded";
  icon: {
    size: number;
    position: "left" | "right";
  };
  onChange?: (keyword: string) => void;
}

function SearchBar({
  width = "full",
  shape = "default",
  icon,
  onChange,
}: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSearchValueChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
    onChange?.(target.value);
  };

  return (
    <S.SearchBox position={icon.position} shape={shape} width={width}>
      <S.SearchIcon src={SearchIcon} alt="검색" size={icon.size} />
      <S.SearchInput
        type="text"
        placeholder="검색어를 입력해 주세요"
        value={value}
        onChange={handleSearchValueChange}
      />
    </S.SearchBox>
  );
}

export default SearchBar;
