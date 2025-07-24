import { httpClient } from "../HttpClient";
import type { ProjectCard } from "./projects.type";

const getProjects = async (): Promise<ProjectCard[]> => {
  const projects = await httpClient.get("/projects");
  if (!projects.ok) {
    throw new Error("Failed to fetch projects");
  }

  return projects.json();
};

export default getProjects;
