import { toast } from "@shared/components/Toast/toast";
import type { Dispatch, SetStateAction } from "react";
import { crawlArticleQueries } from "@/apis/crawl/crawlArticle.queries";
import type { ArticleFormDataType } from "../../types";
import { createEmptyFormData } from "../utils/formUtils";

export const useCrawlArticleMutation = (
  setFormData: Dispatch<SetStateAction<ArticleFormDataType>>
) => {
  const { mutateAsync, isPending } = crawlArticleQueries.fetchCrawl();

  const handleFetchAsync = async (
    url: string,
    disabledCondition: (condition: boolean) => void
  ) => {
    try {
      const data = await mutateAsync(url, {
        onSuccess: () => {
          disabledCondition(false);
        },
        onError: () => {
          disabledCondition(true);
          setFormData(createEmptyFormData());
        },
      });

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

  return { mutateAsync: handleFetchAsync, isPending };
};
