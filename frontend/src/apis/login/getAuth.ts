import { httpClient } from "../HttpClient";
import type { Auth } from "./auth.type";

const getAuth = async (token?: string): Promise<Auth> => {
  if (token) {
    httpClient.setApiKey(token);
  }

  const response = await httpClient.get(`/auth/me`);

  if (!response.ok) {
    throw new Error("Failed to fetch auth");
  }

  return response.json();
};

export default getAuth;
