import { httpClient } from "../HttpClient";
import type { Auth } from "./auth.type";

const getAuth = async (token: string): Promise<Auth> => {
  httpClient.setApiKey(token);
  const auth = await httpClient.get(`/auth/me`);
  if (!auth.ok) {
    throw new Error("Failed to fetch auth");
  }

  return auth.json();
};

export default getAuth;
