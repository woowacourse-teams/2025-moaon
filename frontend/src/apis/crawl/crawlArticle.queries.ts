import { queryOptions } from "@tanstack/react-query";
import getCrawlArticle from "./getCrawlArticle";

export const crawlArticleQueries = {
  fetchCrawl: (url: string) =>
    queryOptions({
      queryKey: ["crawlArticle", url] as const,
      queryFn: () => getCrawlArticle(url),
      throwOnError: true,
      enabled: false,
    }),
};
