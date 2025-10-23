import { toast } from "@shared/components/Toast/toast";
import type { Dispatch, SetStateAction } from "react";
import { crawlArticleQueries } from "@/apis/crawl/crawlArticle.queries";
import type { ArticleFormDataType } from "../../types";

export const useCrawlArticleMutation = (
  setFormData: Dispatch<SetStateAction<ArticleFormDataType>>
) => {
  const { mutate, mutateAsync, isPending } = crawlArticleQueries.fetchCrawl();

  const handleFetch = (
    url: string,
    disabledCondition?: (remainingCount: number) => void
  ) => {
    mutate(url, {
      onSuccess: (data) => {
        const { title, summary, remainingCount } = data;

        setFormData((prev) => ({
          ...prev,
          ...(title ? { title } : {}),
          ...(summary ? { description: summary } : {}),
        }));

        if (typeof remainingCount === "number") {
          disabledCondition?.(remainingCount);
        }
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }
      },
    });
  };

  const handleFetchAsync = async (url: string) => {
    try {
      const data = await mutateAsync(url);

      const { title, summary, remainingCount } = data;

      setFormData((prev) => ({
        ...prev,
        ...(title ? { title } : {}),
        ...(summary ? { description: summary } : {}),
      }));

      return { remainingCount };
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return { mutate: handleFetch, mutateAsync: handleFetchAsync, isPending };
};
