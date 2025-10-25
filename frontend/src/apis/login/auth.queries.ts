import { mutationOptions, queryOptions } from "@tanstack/react-query";
import getAuth from "./getAuth";
import logout from "./logout";

export const authQueries = {
  fetchAuth: (token?: string) =>
    queryOptions({
      queryKey: ["auth"],
      queryFn: () => getAuth(token),
      retry: 0,
    }),
  logout: () =>
    mutationOptions({
      mutationFn: () => logout(),
    }),
};
