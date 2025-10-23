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

        toast.error(
          "메타데이터를 가져오는데 실패했어요. 아티클 제목과 줄거리를 직접 작성해주세요."
        );
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

      toast.error(
        "메타데이터를 가져오는데 실패했어요. 아티클 제목과 줄거리를 직접 작성해주세요."
      );
    }
  };

  return { mutate: handleFetch, mutateAsync: handleFetchAsync, isPending };
};
