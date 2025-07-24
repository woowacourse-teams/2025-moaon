import { httpClient } from "../HttpClient";
import type { ProjectDetail } from "./getProjectDetail.type";

const getProjectDetail = async (id: number): Promise<ProjectDetail> => {
  const projectDetail = await httpClient.get(`/projects/${id}`);
  if (!projectDetail.ok) {
    throw new Error("Failed to fetch projectDetail");
  }

  return projectDetail.json();
};

export default getProjectDetail;
