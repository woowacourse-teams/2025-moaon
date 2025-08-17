import SearchBar from "@shared/components/SearchBar/SearchBar";
import useSearchParams from "@shared/hooks/useSearchParams";
import useProjectList from "../hooks/useProjectList";

const MIN_SEARCH_LENGTH = 2;
const MAX_SEARCH_LENGTH = 50;

function ProjectSearchBar() {
  const params = useSearchParams({ key: "search", mode: "single" });
  const { refetch } = useProjectList();

  const handleSearchChange = (value: string) => {
    if (value.length < MIN_SEARCH_LENGTH) return;

    params.update(value, { replace: true });
    refetch();
  };

  const searchValue = params.get()[0];
  return (
    <SearchBar
      placeholder="프로젝트 제목, 한 줄 설명, 개요를 검색해 보세요"
      onChange={handleSearchChange}
      defaultValue={searchValue}
      maxLength={MAX_SEARCH_LENGTH}
    />
  );
}

export default ProjectSearchBar;
