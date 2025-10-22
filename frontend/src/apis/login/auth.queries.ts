import { queryOptions } from "@tanstack/react-query";
import getAuth from "./getAuth";

export const authQueries = {
  fetchAuth: (token?: string) =>
    queryOptions({
      queryKey: ["auth"],
      queryFn: () => getAuth(token),
      throwOnError: true,
      retry: 0,
    }),
};
