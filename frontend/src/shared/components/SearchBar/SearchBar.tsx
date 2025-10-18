import searchIcon from "@assets/icons/search.svg";
import type { ChangeEvent } from "react";
import CloseIcon from "../CloseIcon/CloseIcon";
import * as S from "./SearchBar.styled";
export type Test = "small" | "medium";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  size?: Test;
}

function SearchBar({
  placeholder,
  value,
  onChange,
  maxLength,
  size = "medium",
}: SearchBarProps) {
  const hasSearchValue = value.trim() !== "";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClearSearch = () => {
    onChange("");
  };

  return (
    <S.SearchWrapper>
      <S.SearchLabel htmlFor="search-input">
        <S.SearchIcon variant={size} src={searchIcon} alt="검색" />
        <S.SearchInput
          variant={size}
          type="text"
          placeholder={placeholder}
          value={value}
          id="search-input"
          onChange={handleInputChange}
          maxLength={maxLength}
        />
        {hasSearchValue && (
          <S.CloseButton type="button" onClick={handleClearSearch}>
            <CloseIcon size={15} />
          </S.CloseButton>
        )}
      </S.SearchLabel>
    </S.SearchWrapper>
  );
}

export default SearchBar;
