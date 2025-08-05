import { httpClient } from "../HttpClient";
import type { Article } from "./articles.type";

const getArticles = async (): Promise<Article[]> => {
  const projects = await httpClient.get(`/articles`);
  if (!projects.ok) {
    throw new Error("Failed to fetch projects");
  }

  return projects.json();
};

export default getArticles;
