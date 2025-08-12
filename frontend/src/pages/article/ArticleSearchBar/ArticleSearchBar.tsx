import SearchBar from "@shared/components/SearchBar/SearchBar";
import useSearchParams from "@shared/hooks/useSearchParams";
import useArticleList from "../hooks/useArticleList";

const MIN_SEARCH_LENGTH = 2;

function ArticleSearchBar() {
  const params = useSearchParams({ key: "search", mode: "single" });
  const { refetch } = useArticleList();

  const handleSearchSubmit = (value: string) => {
    if (value === "") {
      params.deleteAll({ replace: true });
      refetch();
      return;
    }

    if (value.length < MIN_SEARCH_LENGTH) {
      alert(`검색어는 ${MIN_SEARCH_LENGTH}글자 이상 입력해주세요.`);
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
    />
  );
}

export default ArticleSearchBar;
