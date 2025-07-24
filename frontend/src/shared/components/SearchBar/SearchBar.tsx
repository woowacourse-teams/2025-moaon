import SearchIcon from "@assets/icons/search.svg";
import useSearchParams from "@shared/hooks/useSearchParams";
import { type ChangeEvent, type FormEvent, useState } from "react";
import useProjectList from "@/pages/list/hooks/useProjectList";
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
  const params = useSearchParams({ key: "search", mode: "single" });
  const { refetch } = useProjectList();

  const handleSearchValueChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
    onChange?.(target.value);
  };

  const handleSearchFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    params.update(value);
    refetch();
  };

  return (
    <S.SearchForm onSubmit={handleSearchFormSubmit}>
      <S.SearchBox position={icon.position} shape={shape} width={width}>
        <S.SearchInput
          type="text"
          placeholder="검색어를 입력해 주세요"
          value={value}
          onChange={handleSearchValueChange}
        />
        <S.Button type="submit">
          <S.SearchIcon src={SearchIcon} alt="검색" size={icon.size} />
        </S.Button>
      </S.SearchBox>
    </S.SearchForm>
  );
}

export default SearchBar;
