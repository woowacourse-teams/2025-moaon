import type { ArticleSectorKey } from "@domains/filter/articleSector";
import useSearchParams from "@shared/hooks/useSearchParams";

export const useArticleCategory = (defaultValue: ArticleSectorKey) => {
  const categoryParams = useSearchParams({
    key: "category",
    mode: "single",
  });

  const rawSelectedCategory = categoryParams.get()[0] as ArticleSectorKey;
  const selectedCategory = rawSelectedCategory ?? defaultValue;

  const updateCategory = (key: ArticleSectorKey) => {
    categoryParams.update(key, { replace: true });
  };

  return { selectedCategory, updateCategory };
};
