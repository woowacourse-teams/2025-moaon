import { useQuery } from "@tanstack/react-query";
import { projectDetailQueries } from "@/apis/projectDetail/projectDetail.queries";

const useProjectDetail = (id: number) => {
  const {
    data: projectDetail,
    isLoading,
    error,
  } = useQuery(projectDetailQueries.fetchDetail(id));

  return { projectDetail, isLoading, error };
};

export default useProjectDetail;
