import { toast } from "@shared/components/Toast/toast";
import { useMutation } from "@tanstack/react-query";
import type { Dispatch } from "react";
import getCrawlArticle from "@/apis/crawl/getCrawlArticle";
import type { ArticleFormDataType } from "../../types";

const useCrawlArticleMutation = (
  setFormData: Dispatch<React.SetStateAction<ArticleFormDataType>>
) => {
  const fetchMetaMutation = useMutation({
    mutationFn: (url: string) => getCrawlArticle(url),
    onSuccess: ({ title, summary }) => {
      if (title || summary) {
        setFormData((prev) => ({
          ...prev,
          ...(title && { title }),
          ...(summary && { description: summary }),
        }));

        return;
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error(
        "메타데이터를 가져오는데 실패했어요. 주소를 다시 확인해주세요."
      );
    },
  });

  return fetchMetaMutation;
};

export default useCrawlArticleMutation;
