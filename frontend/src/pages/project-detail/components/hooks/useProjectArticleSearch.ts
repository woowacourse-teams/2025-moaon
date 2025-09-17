import useSearchParams from "@shared/hooks/useSearchParams";

const useProjectArticleSearch = () => {
  const params = useSearchParams({ key: "search", mode: "single" });

  const handleSearchSubmit = (value: string) => {
    if (value === "") {
      params.deleteAll({ replace: true });
      return;
    }

    params.update(value, { replace: true });
  };

  const searchValue = params.get()[0];

  return {
    handleSearchSubmit,
    searchValue,
  };
};

export default useProjectArticleSearch;
