import { useMutation } from "@tanstack/react-query";
import getCrawlArticle from "./getCrawlArticle";

export const crawlArticleQueries = {
  fetchCrawl: () =>
    useMutation({
      mutationFn: (url: string) => getCrawlArticle(url),
    }),
};
