import type { Article } from "../articles/articles.type";
import { httpClient } from "../HttpClient";

const getProjectArticles = async (id: number): Promise<Article[]> => {
  const projectArticles = await httpClient.get(
    `/projects/${id}/articles${window.location.search}`
  );

  if (!projectArticles.ok) {
    throw new Error("Failed to fetch project's articles");
  }

  return projectArticles.json();
};

export default getProjectArticles;
