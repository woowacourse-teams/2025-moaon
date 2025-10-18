import SearchBar from "@shared/components/SearchBar/SearchBar";
import useDebounce from "@shared/hooks/useDebounce";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useEffect, useRef, useState } from "react";
import useArticleList from "../hooks/useArticleList";

const MAX_SEARCH_LENGTH = 50;
const DEBOUNCE_DELAY = 400;

function ArticleSearchBar() {
  const params = useSearchParams({ key: "search", mode: "single" });
  const { refetch } = useArticleList();

  const searchValue = params.get()[0] ?? "";
  const [inputValue, setInputValue] = useState(searchValue);

  const debouncedValue = useDebounce({
    value: inputValue,
    delay: DEBOUNCE_DELAY,
  });

  const paramsRef = useRef(params);
  const refetchRef = useRef(refetch);

  useEffect(() => {
    paramsRef.current = params;
    refetchRef.current = refetch;
  }, [params, refetch]);

  useEffect(() => {
    const currentParam = paramsRef.current.get()[0] ?? "";

    // 디바운스된 값이 현재 파라미터와 같으면 요청하지 않음
    if (currentParam === debouncedValue) return;

    // 빈 문자열인 경우 파라미터 삭제만 하고 refetch는 하지 않음
    if (debouncedValue.trim() === "") {
      if (currentParam !== "") {
        paramsRef.current.deleteAll({ replace: true });
        refetchRef.current();
      }
      return;
    }

    // 검색어가 있을 때만 파라미터 업데이트 및 refetch
    paramsRef.current.update(debouncedValue, { replace: true });
    refetchRef.current();
  }, [debouncedValue]);

  return (
    <SearchBar
      placeholder="아티클 제목, 내용을 검색해 보세요"
      value={inputValue}
      onChange={setInputValue}
      maxLength={MAX_SEARCH_LENGTH}
    />
  );
}

export default ArticleSearchBar;
