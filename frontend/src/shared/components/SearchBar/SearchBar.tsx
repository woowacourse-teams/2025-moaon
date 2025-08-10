import searchIcon from "@assets/icons/search.svg";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import CloseIcon from "../Close/Close";
import * as S from "./SearchBar.styled";

interface SearchBarProps {
  placeholder: string;
  onSubmit: (value: string) => void;
  defaultValue?: string;
  maxLength: number;
}

function SearchBar({
  placeholder,
  onSubmit,
  defaultValue = "",
  maxLength,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasSearchValue, setHasSearchValue] = useState(
    defaultValue.trim() !== "",
  );

  useEffect(() => {
    const currentValue = inputRef.current?.value ?? "";
    const newHasValue = currentValue.trim() !== "";
    setHasSearchValue(newHasValue);
  }, []);

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
        <S.SearchIcon src={searchIcon} alt="검색" />
        <S.SearchInput
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
