import { useQuery } from "@tanstack/react-query";
import { projectQueries } from "@/apis/projects/project.queries";

const useProjectList = () => {
  const { data: projects, isLoading } = useQuery(projectQueries.fetchList());

  return { projects, isLoading };
};

export default useProjectList;
