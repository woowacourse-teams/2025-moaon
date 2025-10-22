import useSearchParams from "@shared/hooks/useSearchParams";
import { useEffect, useRef } from "react";

interface UseSearchSortOptions<T extends string> {
  excludeKeysWhenNoSearch?: T[];
}

interface UseSearchSortReturn<T extends string> {
  hasSearch: boolean;
  excludeKeys: T[];
}

export const useSearchSort = <T extends string>(
  options: UseSearchSortOptions<T> = {}
): UseSearchSortReturn<T> => {
  const { excludeKeysWhenNoSearch = [] } = options;

  const searchParams = useSearchParams({ key: "search", mode: "single" });
  const sortParams = useSearchParams({ key: "sort", mode: "single" });

  const searchValue = searchParams.get()[0];
  const hasSearch = Boolean(searchValue && searchValue.trim() !== "");

  const sortParamsRef = useRef(sortParams);

  useEffect(() => {
    sortParamsRef.current = sortParams;
  }, [sortParams]);

  useEffect(() => {
    const currentSort = sortParamsRef.current.get()[0];

    if (hasSearch && !currentSort) {
      sortParamsRef.current.update("relevance", { replace: true });
    } else if (!hasSearch && currentSort === "relevance") {
      sortParamsRef.current.deleteAll({ replace: true });
    }
  }, [hasSearch]);

  const excludeKeys = hasSearch ? ([] as T[]) : excludeKeysWhenNoSearch;

  return {
    hasSearch,
    excludeKeys,
  };
};
