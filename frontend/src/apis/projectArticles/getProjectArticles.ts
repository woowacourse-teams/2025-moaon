import { httpClient } from "../HttpClient";
import type { ProjectArticlesResponse } from "./projectArticles.type";

const getProjectArticles = async (id: number): Promise<ProjectArticlesResponse> => {
  const projectArticles = await httpClient.get(`/projects/${id}/articles${window.location.search}`);

  if (!projectArticles.ok) {
    throw new Error("Failed to fetch project's articles");
  }

  return projectArticles.json();
};

export default getProjectArticles;
