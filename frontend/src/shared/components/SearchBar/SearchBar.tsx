import searchIcon from "@assets/icons/search.svg";
import { type FormEvent, useRef, useState } from "react";
import CloseIcon from "../Close/Close";
import * as S from "./SearchBar.styled";

interface SearchBarProps {
  placeholder: string;
  onSubmit: (value: string) => void;
}

function SearchBar({ placeholder, onSubmit }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = inputRef.current?.value || "";
    onSubmit(value);
  };

  const handleInputChange = () => {
    const value = inputRef.current?.value || "";
    setSearchValue(value);
  };

  const handleClearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchValue("");
      onSubmit("");
    }
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
          onChange={handleInputChange}
        />
        {searchValue && (
          <S.CloseButton type="button" onClick={handleClearSearch}>
            <CloseIcon size={15} />
          </S.CloseButton>
        )}
      </S.SearchLabel>
    </S.SearchForm>
  );
}

export default SearchBar;
