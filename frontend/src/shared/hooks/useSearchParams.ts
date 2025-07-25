import { useCallback } from "react";
import { useSearchParams as useReactRouterSearchParams } from "react-router";

type SearchParamOptions = {
  key: string;
  mode: "single" | "multi";
};

const useSearchParams = ({ key, mode }: SearchParamOptions) => {
  const [searchParams, setSearchParams] = useReactRouterSearchParams();

  const getAllSearchParams = useCallback(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  const getSearchParams = useCallback(() => {
    const currentValues = searchParams.get(key);

    if (!currentValues) {
      return [];
    }

    return currentValues.split(",");
  }, [key, searchParams]);

  const updateSearchParams = useCallback(
    (values: string[]) => {
      const params = new URLSearchParams(searchParams);
      params.delete(key);

      if (values.length === 0) {
        setSearchParams(params);
        return;
      }

      params.append(key, values.join(","));
      setSearchParams(params);
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

  const updateParamValue = (value: string) => {
    const newValues = paramOperations[mode](value);
    updateSearchParams(newValues);
  };

  return {
    get: getSearchParams,
    getAll: getAllSearchParams,
    update: updateParamValue,
  };
};

export default useSearchParams;
