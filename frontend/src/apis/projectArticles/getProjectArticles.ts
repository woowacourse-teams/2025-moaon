import { httpClient } from "../HttpClient";
import type { ProjectArticle } from "./projectArticles.type";

const getProjectArticles = async (id: number): Promise<ProjectArticle[]> => {
  const projectArticles = await httpClient.get(
    `/projects/${id}/articles${window.location.search}`
  );

  if (!projectArticles.ok) {
    throw new Error("Failed to fetch project's articles");
  }

  return projectArticles.json();
};

export default getProjectArticles;
