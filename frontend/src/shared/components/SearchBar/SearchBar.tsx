import searchIcon from "@assets/icons/search.svg";
import { type FormEvent, useRef } from "react";
import * as S from "./SearchBar.styled";

interface SearchBarProps {
  placeholder: string;
  onSubmit: (value: string) => void;
}

function SearchBar({ placeholder, onSubmit }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(inputRef.current?.value || "");
  };

  return (
    <S.SearchForm onSubmit={handleSearchFormSubmit}>
      <S.SearchLabel htmlFor="search-input">
        <S.SearchIcon src={searchIcon} alt="검색" />
        <S.SearchInput
          type="text"
          placeholder={placeholder}
          ref={inputRef}
          id="search-input"
        />
      </S.SearchLabel>
    </S.SearchForm>
  );
}

export default SearchBar;
