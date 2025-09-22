import searchIcon from "@assets/icons/search.svg";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import CloseIcon from "../CloseIcon/CloseIcon";
import * as S from "./SearchBar.styled";
export type Test = "small" | "medium";

interface SearchBarProps {
  placeholder: string;
  onSubmit: (value: string) => void;
  defaultValue?: string;
  maxLength: number;
  size?: Test;
}

function SearchBar({
  placeholder,
  onSubmit,
  defaultValue = "",
  maxLength,
  size = "medium",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasSearchValue, setHasSearchValue] = useState(
    defaultValue.trim() !== "",
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
      setHasSearchValue(defaultValue.trim() !== "");
    }
  }, [defaultValue]);

  const handleSearchFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value || "";
    onSubmit(value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasSearchValue(e.target.value.trim() !== "");
  };

  const handleClearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setHasSearchValue(false);
      onSubmit("");
    }
  };

  return (
    <S.SearchForm onSubmit={handleSearchFormSubmit}>
      <S.SearchLabel htmlFor="search-input">
        <S.SearchIcon variant={size} src={searchIcon} alt="검색" />
        <S.SearchInput
          variant={size}
          type="text"
          placeholder={placeholder}
          ref={inputRef}
          defaultValue={defaultValue}
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
    </S.SearchForm>
  );
}
export default SearchBar;
