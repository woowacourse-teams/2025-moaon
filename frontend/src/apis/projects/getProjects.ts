import { httpClient } from "../HttpClient";
import type { ProjectsResponse } from "./projects.type";

const PAGE_SIZE = 20;

const getProjects = async (cursor: string): Promise<ProjectsResponse> => {
  const queryString = new URLSearchParams(window.location.search);
  queryString.set("limit", PAGE_SIZE.toString());
  if (cursor) {
    queryString.set("cursor", cursor);
  }

  const projects = await httpClient.get(`/projects?${queryString.toString()}`);

  if (!projects.ok) {
    throw new Error("Failed to fetch projects");
  }

  return projects.json();
};

export default getProjects;
