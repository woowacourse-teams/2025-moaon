import { httpClient } from "../HttpClient";

const getProjects = async () => {
  try {
    const projects = await httpClient.get("/projects");
    if (!projects.ok) {
      throw new Error("Failed to fetch projects");
    }

    return projects.json();
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default getProjects;
