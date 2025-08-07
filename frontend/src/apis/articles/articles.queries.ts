import { infiniteQueryOptions } from "@tanstack/react-query";
import getArticles from "./getArticles";

export const articlesQueries = {
  all: ["articles"] as const,
  fetchList: () =>
    infiniteQueryOptions({
      queryKey: articlesQueries.all,
      queryFn: ({ pageParam }) => getArticles(pageParam),
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : ""),
      initialPageParam: "",
      throwOnError: true,
    }),
};
