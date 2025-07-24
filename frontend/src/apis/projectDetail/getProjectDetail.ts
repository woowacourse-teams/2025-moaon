import { httpClient } from "../HttpClient";

const getProjectDetail = async (id: number) => {
  try {
    const projectDetail = await httpClient.get(`/projects/${id}`);
    if (!projectDetail.ok) {
      throw new Error("Failed to fetch projectDetail");
    }

    return projectDetail.json();
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default getProjectDetail;
