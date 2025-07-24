import { useQuery } from "@tanstack/react-query";
import { projectQueries } from "@/apis/projects/project.queries";

const useProjectList = () => {
  const { data: projects } = useQuery(projectQueries.fetchList());

  return { projects };
};

export default useProjectList;
