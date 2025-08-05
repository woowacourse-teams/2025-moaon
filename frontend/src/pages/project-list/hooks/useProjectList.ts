import { useQuery } from "@tanstack/react-query";
import { projectQueries } from "@/apis/projects/project.queries";

const useProjectList = () => {
  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery(projectQueries.fetchList());

  return { projects, isLoading, refetch };
};

export default useProjectList;
