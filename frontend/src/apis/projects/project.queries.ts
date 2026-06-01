import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";
import getProjects from "./getProjects";

export const projectQueries = {
  all: ["projects"] as const,
  fetchList: (search: string) =>
    infiniteQueryOptions({
      queryKey: [...projectQueries.all, search],
      queryFn: ({ pageParam }) => getProjects(search, pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : "",
      initialPageParam: "",
      placeholderData: keepPreviousData,
      throwOnError: true,
    }),
};
