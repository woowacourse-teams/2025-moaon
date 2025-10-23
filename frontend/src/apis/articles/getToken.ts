import { httpClient } from "../HttpClient";

const getToken = async () => {
  const response = await httpClient.get(`/crawl/token-count`);

  if (!response.ok) {
    throw new Error("token을 가지고 오지 못 했습니다.");
  }

  return response.json();
};

export default getToken;
