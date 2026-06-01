import {
  infiniteQueryOptions,
  keepPreviousData,
  mutationOptions,
  queryOptions,
} from "@tanstack/react-query";
import type { PostArticleData } from "./articles.type";
import getArticles from "./getArticles";
import getToken from "./getToken";
import postArticle from "./postArticle";
import postArticleView from "./postArticleView";

export const articlesQueries = {
  all: ["articles"] as const,
  fetchList: (search: string) =>
    infiniteQueryOptions({
      queryKey: [...articlesQueries.all, search],
      queryFn: ({ pageParam }) => getArticles(search, pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : "",
      initialPageParam: "",
      placeholderData: keepPreviousData,
    }),
  postArticleClick: () =>
    mutationOptions({
      mutationFn: (id: number) => postArticleView(id),
    }),
  postArticles: () =>
    mutationOptions({
      mutationFn: (postData: PostArticleData[]) => postArticle(postData),
    }),
  getToken: () =>
    queryOptions({
      queryKey: ["authToken"],
      queryFn: () => getToken(),
      throwOnError: true,
      retry: 0,
    }),
};
