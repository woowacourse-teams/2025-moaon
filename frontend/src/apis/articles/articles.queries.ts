import { infiniteQueryOptions, mutationOptions } from "@tanstack/react-query";
import getArticles from "./getArticles";
import postArticleView from "./postArticleView";

export const articlesQueries = {
  all: ["articles"] as const,
  fetchList: () =>
    infiniteQueryOptions({
      queryKey: articlesQueries.all,
      queryFn: ({ pageParam }) => getArticles(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : "",
      initialPageParam: "",
    }),
  postArticleClick: () =>
    mutationOptions({
      mutationFn: (id: number) => postArticleView(id),
    }),
};
