import { infiniteQueryOptions } from "@tanstack/react-query";
import getProjects from "./getProjects";

export const projectQueries = {
  all: ["projects"] as const,
  fetchList: () =>
    infiniteQueryOptions({
      queryKey: projectQueries.all,
      queryFn: ({ pageParam }) => getProjects(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : "",
      initialPageParam: "",
      throwOnError: true,
    }),
};
