import type { ProjectCategoryKey } from "@domains/filter/projectCategory";
import type { TechStackKey } from "@domains/filter/techStack";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useSearchParams as useReactRouterSearchParams } from "react-router";

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useReactRouterSearchParams();
  const techStackParams = useSearchParams({ key: "techStacks", mode: "multi" });
  const categoryParams = useSearchParams({ key: "categories", mode: "multi" });

  const resetFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categories");
    params.delete("techStacks");
    setSearchParams(params);
  };

  const updateTechStackParam = (techStack: string) => {
    techStackParams.update(techStack, { replace: true });
  };

  const updateCategoryParam = (category: string) => {
    categoryParams.update(category, { replace: true });
  };

  return {
    techStacks: techStackParams.get() as TechStackKey[],
    categories: categoryParams.get() as ProjectCategoryKey[],
    updateTechStackParam,
    updateCategoryParam,
    resetFilter,
  };
};
