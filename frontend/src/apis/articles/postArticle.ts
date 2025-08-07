import { httpClient } from "../HttpClient";

const postArticle = async (id: number) => {
  await httpClient.post(`/articles/${id}/clicks`, {});
};

export default postArticle;
