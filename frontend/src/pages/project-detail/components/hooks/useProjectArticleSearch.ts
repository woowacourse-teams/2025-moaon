import { toast } from "@shared/components/Toast/toast";
import useSearchParams from "@shared/hooks/useSearchParams";

const useProjectArticleSearch = () => {
  const params = useSearchParams({ key: "search", mode: "single" });

  const handleSearchSubmit = (value: string) => {
    if (value === "") {
      params.deleteAll({ replace: true });
      return;
    }

    if (value.length < 2) toast.error("검색어는 2글자 이상 입력해주세요.");

    params.update(value, { replace: true });
  };

  const searchValue = params.get()[0];

  return {
    handleSearchSubmit,
    searchValue,
  };
};

export default useProjectArticleSearch;
