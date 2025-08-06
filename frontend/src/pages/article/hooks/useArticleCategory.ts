import type { ArticleCategoryKey } from "@domains/filter/articleCategory";
import useSearchParams from "@shared/hooks/useSearchParams";

export const useArticleCategory = (defaultValue: ArticleCategoryKey) => {
  const categoryParams = useSearchParams({
    key: "category",
    mode: "single",
  });

  const rawSelectedCategory = categoryParams.get()[0];
  const selectedCategory = (rawSelectedCategory ??
    defaultValue) as ArticleCategoryKey;

  const updateCategory = (key: ArticleCategoryKey) => {
    categoryParams.update(key);
  };

  return { selectedCategory, updateCategory };
};
