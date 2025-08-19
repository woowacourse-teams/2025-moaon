import SearchBar from "@shared/components/SearchBar/SearchBar";
import { toast } from "@shared/components/Toast/toast";
import useSearchParams from "@shared/hooks/useSearchParams";
import useProjectList from "../hooks/useProjectList";

const MIN_SEARCH_LENGTH = 2;
const MAX_SEARCH_LENGTH = 50;

function ProjectSearchBar() {
  const params = useSearchParams({ key: "search", mode: "single" });
  const { refetch } = useProjectList();

  const handleSearchSubmit = (value: string) => {
    if (value === "") {
      params.deleteAll({ replace: true });
      refetch();
      return;
    }

    if (value.length < MIN_SEARCH_LENGTH) {
      toast.warning(`검색어는 ${MIN_SEARCH_LENGTH}글자 이상 입력해주세요.`);
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
      maxLength={MAX_SEARCH_LENGTH}
    />
  );
}

export default ProjectSearchBar;
