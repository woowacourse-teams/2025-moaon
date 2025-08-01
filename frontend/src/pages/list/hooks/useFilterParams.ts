import type { CategoryKey } from "@domains/filter/category";
import type { TechStackKey } from "@domains/filter/techStack";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useSearchParams as useReactRouterSearchParams } from "react-router";

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useReactRouterSearchParams();
  const techStackParams = useSearchParams({ key: "techStacks", mode: "multi" });
  const categoryParams = useSearchParams({ key: "categories", mode: "multi" });

  const deleteFilter = (key: string, value: string) => {
    switch (key) {
      case "techStacks":
        techStackParams.update(value);
        break;
      case "categories":
        categoryParams.update(value);
        break;
      default:
        throw new Error(`Unknown filter key: ${key}`);
    }
  };

  const resetFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categories");
    params.delete("techStacks");
    setSearchParams(params);
  };

  return {
    techStacks: techStackParams.get() as TechStackKey[],
    categories: categoryParams.get() as CategoryKey[],
    deleteFilter,
    resetFilter,
  };
};
