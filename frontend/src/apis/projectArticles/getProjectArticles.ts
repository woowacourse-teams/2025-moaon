import { httpClient } from "../HttpClient";
import type { ProjectArticlesResponse } from "./projectArticles.type";

const getProjectArticles = async (
  id: number
): Promise<ProjectArticlesResponse> => {
  const projectArticles = await httpClient.get(
    `/projects/${id}/articles${window.location.search}`
  );

  if (!projectArticles.ok) {
    const errorData = await projectArticles.json();
    throw new Error(errorData.message);
  }

  return projectArticles.json();
};

export default getProjectArticles;
