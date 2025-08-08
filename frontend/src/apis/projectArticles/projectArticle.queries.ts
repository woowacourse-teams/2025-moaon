import { queryOptions } from "@tanstack/react-query";
import getProjectArticles from "./getProjectArticles";

export const projectArticleQueries = {
  fetchList: (id: number) =>
    queryOptions({
      queryKey: ["projectArticles", id] as const,
      queryFn: () => getProjectArticles(id),
    }),
};
