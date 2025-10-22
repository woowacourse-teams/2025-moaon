import { httpClient } from "../HttpClient";

const logout = async () => {
  const response = await httpClient.post(`/auth/logout`);

  if (!response.ok) {
    throw new Error("Fail to post logout");
  }
};

export default logout;
