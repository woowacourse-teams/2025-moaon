import { httpClient } from "../HttpClient";

const postArticleView = async (id: number) => {
  await httpClient.post(`/articles/${id}/clicks`);
};

export default postArticleView;
