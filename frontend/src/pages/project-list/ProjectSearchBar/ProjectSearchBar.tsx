import SearchBar from "@shared/components/SearchBar/SearchBar";
import useDebounce from "@shared/hooks/useDebounce";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useEffect, useRef, useState } from "react";
import useProjectList from "../hooks/useProjectList";

const MAX_SEARCH_LENGTH = 50;

function ProjectSearchBar() {
  const params = useSearchParams({ key: "search", mode: "single" });
  const { refetch } = useProjectList();

  const searchValue = params.get()[0] ?? "";
  const [inputValue, setInputValue] = useState(searchValue);

  const debouncedValue = useDebounce({
    value: inputValue,
  });

  const paramsRef = useRef(params);
  const refetchRef = useRef(refetch);

  useEffect(() => {
    paramsRef.current = params;
    refetchRef.current = refetch;
  }, [params, refetch]);

  useEffect(() => {
    const currentParam = paramsRef.current.get()[0] ?? "";

    if (currentParam === debouncedValue) return;

    if (debouncedValue.trim() === "") {
      if (currentParam !== "") {
        paramsRef.current.deleteAll({ replace: true });
        refetchRef.current();
      }
      return;
    }

    paramsRef.current.update(debouncedValue, { replace: true });
    refetchRef.current();
  }, [debouncedValue]);

  return (
    <SearchBar
      placeholder="프로젝트 제목, 한 줄 설명, 개요를 검색해 보세요"
      value={inputValue}
      onChange={setInputValue}
      maxLength={MAX_SEARCH_LENGTH}
    />
  );
}

export default ProjectSearchBar;
