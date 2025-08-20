import { queryOptions } from "@tanstack/react-query";
import getProjectDetail from "./getProjectDetail";

export const projectDetailQueries = {
  fetchDetail: (id: number) =>
    queryOptions({
      queryKey: ["projectDetail", id] as const,
      queryFn: () => getProjectDetail(id),
      throwOnError: true,
    }),
};
