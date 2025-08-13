import SearchBar from "@shared/components/SearchBar/SearchBar";
import useSearchParams from "@shared/hooks/useSearchParams";
import useArticleList from "../hooks/useArticleList";

const MAX_SEARCH_LENGTH = 50;

function ArticleSearchBar() {
  const params = useSearchParams({ key: "search", mode: "single" });
  const { refetch } = useArticleList();

  const handleSearchSubmit = (value: string) => {
    if (value === "") {
      params.deleteAll({ replace: true });
      refetch();
      return;
    }

    params.update(value, { replace: true });
    refetch();
  };

  const searchValue = params.get()[0];
  return (
    <SearchBar
      placeholder="아티클 제목, 내용을 검색해 보세요"
      onSubmit={handleSearchSubmit}
      defaultValue={searchValue}
      maxLength={MAX_SEARCH_LENGTH}
    />
  );
}

export default ArticleSearchBar;
