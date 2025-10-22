import { httpClient } from "../HttpClient";

const logout = async () => {
  await httpClient.post(`/auth/logout`);
};

export default logout;