import SearchBar from "@shared/components/SearchBar/SearchBar";
import useSearchParams from "@shared/hooks/useSearchParams";
import useArticleList from "../hooks/useArticleList";

const MIN_SEARCH_LENGTH = 2;
const MAX_SEARCH_LENGTH = 50;

function ArticleSearchBar() {
  const params = useSearchParams({ key: "search", mode: "single" });
  const { refetch } = useArticleList();

  const handleSearchChange = (value: string) => {
    if (value.length < MIN_SEARCH_LENGTH) return;

    params.update(value, { replace: true });
    refetch();
  };

  const searchValue = params.get()[0];
  return (
    <SearchBar
      placeholder="아티클 제목, 내용을 검색해 보세요"
      onChange={handleSearchChange}
      defaultValue={searchValue}
      maxLength={MAX_SEARCH_LENGTH}
    />
  );
}

export default ArticleSearchBar;
