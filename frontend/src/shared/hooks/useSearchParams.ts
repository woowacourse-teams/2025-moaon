import { useCallback } from "react";
import {
  type NavigateOptions,
  useSearchParams as useReactRouterSearchParams,
} from "react-router";

type SearchParamOptions = {
  key: string;
  mode: "single" | "multi";
};

const useSearchParams = ({ key, mode }: SearchParamOptions) => {
  const [searchParams, setSearchParams] = useReactRouterSearchParams();

  const getSearchParams = useCallback(() => {
    const currentValues = searchParams.get(key);

    if (!currentValues) {
      return [];
    }

    return currentValues.split(",");
  }, [key, searchParams]);

  const updateSearchParams = useCallback(
    (values: string[], options?: NavigateOptions) => {
      const params = new URLSearchParams(searchParams);
      params.delete(key);

      if (values.length === 0) {
        setSearchParams(params, options);
        return;
      }

      params.append(key, values.join(","));
      setSearchParams(params, options);
    },
    [key, searchParams, setSearchParams]
  );

  const deleteAllSearchParams = useCallback(
    (options?: NavigateOptions) => {
      const params = new URLSearchParams(searchParams);
      params.delete(key);
      setSearchParams(params, options);
    },
    [key, searchParams, setSearchParams]
  );

  const paramOperations = {
    single: (value: string) => [value],
    multi: (value: string) => {
      const currentValues = getSearchParams();
      return currentValues.includes(value)
        ? currentValues.filter((currentValue) => currentValue !== value)
        : [...currentValues, value];
    },
  };

  const updateParamValue = (value: string, options?: { replace?: boolean }) => {
    const newValues = paramOperations[mode](value);
    updateSearchParams(newValues, options);
  };

  return {
    get: getSearchParams,
    update: updateParamValue,
    deleteAll: deleteAllSearchParams,
  };
};

export default useSearchParams;
