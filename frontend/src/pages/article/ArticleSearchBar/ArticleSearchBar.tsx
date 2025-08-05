import SearchBar from "@shared/components/SearchBar/SearchBar";
import useSearchParams from "@shared/hooks/useSearchParams";
import useProjectList from "@/pages/project-list/hooks/useProjectList";

function ArticleSearchBar() {
  const params = useSearchParams({ key: "search", mode: "single" });
  const { refetch } = useProjectList();

  const handleSearchSubmit = (value: string) => {
    if (value === "") {
      params.deleteAll();
      refetch();
      return;
    }

    params.update(value);
    refetch();
  };

  return (
    <SearchBar
      placeholder="아티클 제목, 내용을 검색해 보세요"
      onSubmit={handleSearchSubmit}
    />
  );
}

export default ArticleSearchBar;
