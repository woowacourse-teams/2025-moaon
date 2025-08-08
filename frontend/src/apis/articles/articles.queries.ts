import { infiniteQueryOptions, mutationOptions } from "@tanstack/react-query";
import getArticles from "./getArticles";
import postArticle from "./postArticle";

export const articlesQueries = {
  all: ["articles"] as const,
  fetchList: () =>
    infiniteQueryOptions({
      queryKey: articlesQueries.all,
      queryFn: ({ pageParam }) => getArticles(pageParam),
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : ""),
      initialPageParam: "",
    }),
  postArticleClick: () =>
    mutationOptions({
      mutationFn: (id: number) => postArticle(id),
    }),
};
