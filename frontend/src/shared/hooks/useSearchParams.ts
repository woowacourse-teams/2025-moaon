import { useCallback } from "react";
import { type NavigateOptions, useSearchParams as useReactRouterSearchParams } from "react-router";

interface updateSearchParams {
  params: URLSearchParams;
  values: string[];
  options?: NavigateOptions & { reset?: boolean };
}

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

  const clearSearchParams = (reset: boolean) => {
    if (reset) {
      return new URLSearchParams();
    }

    const params = new URLSearchParams(searchParams);
    params.delete(key);
    return params;
  };

  const updateSearchParams = useCallback(
    ({ params, values, options }: updateSearchParams) => {
      if (values.length === 0) {
        setSearchParams(params, options);
        return;
      }

      params.append(key, values.join(","));
      setSearchParams(params, options);
    },
    [key, setSearchParams]
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
      return currentValues.includes(value) ? currentValues.filter((currentValue) => currentValue !== value) : [...currentValues, value];
    },
  };

  const updateParamValue = (value: string, options?: { replace?: boolean; reset?: boolean }) => {
    const newValues = paramOperations[mode](value);
    const params = clearSearchParams(options?.reset ?? false);
    updateSearchParams({ params, values: newValues, options });
  };

  return {
    get: getSearchParams,
    update: updateParamValue,
    deleteAll: deleteAllSearchParams,
  };
};

export default useSearchParams;
