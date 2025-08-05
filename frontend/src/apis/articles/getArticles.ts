import { httpClient } from "../HttpClient";
import type { Article } from "./articles.type";

const getArticles = async (): Promise<Article[]> => {
  const articles = await httpClient.get(`/articles`);
  if (!articles.ok) {
    throw new Error("Failed to fetch articles");
  }

  return articles.json();
};

export default getArticles;
