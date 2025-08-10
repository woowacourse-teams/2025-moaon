import SearchBar from "@shared/components/SearchBar/SearchBar";
import useSearchParams from "@shared/hooks/useSearchParams";
import useProjectList from "../hooks/useProjectList";

function ProjectSearchBar() {
  const params = useSearchParams({ key: "search", mode: "single" });
  const { refetch } = useProjectList();

  const handleSearchSubmit = (value: string) => {
    if (value.length <= 1) {
      alert("검색어는 2글자 이상 입력해주세요.");
      return;
    }

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
      placeholder="프로젝트 제목, 한 줄 설명, 개요를 검색해 보세요"
      onSubmit={handleSearchSubmit}
      defaultValue={searchValue}
    />
  );
}

export default ProjectSearchBar;
