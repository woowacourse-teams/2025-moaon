import { queryOptions } from "@tanstack/react-query";
import getProjects from "./getProjects";

export const projectQueries = {
  all: ["projects"] as const,
  fetchList: () =>
    queryOptions({
      queryKey: projectQueries.all,
      queryFn: getProjects,
    }),
};
