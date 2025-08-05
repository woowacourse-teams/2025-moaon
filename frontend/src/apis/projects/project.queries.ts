import { queryOptions } from "@tanstack/react-query";
import getProjects from "./getProjects";

export const projectQueries = {
  all: ["projects"] as const,
  fetchList: (cursor?: string) =>
    queryOptions({
      queryKey: projectQueries.all,
      queryFn: () => getProjects(cursor),
    }),
};
