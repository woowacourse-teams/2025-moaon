import { queryOptions } from "@tanstack/react-query";
import getArticles from "./getArticles";

export const articlesQueries = {
  all: ["articles"] as const,
  fetchList: () =>
    queryOptions({
      queryKey: articlesQueries.all,
      queryFn: getArticles,
    }),
};
