import searchIcon from "@assets/icons/search.svg";
import type { ChangeEvent } from "react";
import CloseIcon from "../CloseIcon/CloseIcon";
import * as S from "./SearchBar.styled";
export type Test = "small" | "medium";

interface SearchBarProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  size?: Test;
  id?: string;
}

function SearchBar({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  size = "medium",
  id = "search-input",
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
      <S.SearchLabel htmlFor={id}>
        <S.VisuallyHidden>{label}</S.VisuallyHidden>
        <S.SearchIcon variant={size} src={searchIcon} alt="" />
        <S.SearchInput
          variant={size}
          type="text"
          placeholder={placeholder}
          value={value}
          id={id}
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
