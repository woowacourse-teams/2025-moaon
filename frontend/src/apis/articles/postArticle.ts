import { httpClient } from "../HttpClient";
import type { PostArticleData } from "./articles.type";

const postArticle = async (data: PostArticleData[]) => {
  await httpClient.post(`/articles`, data);
};

export default postArticle;
