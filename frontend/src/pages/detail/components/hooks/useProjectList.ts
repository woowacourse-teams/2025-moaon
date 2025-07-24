import { useQuery } from "@tanstack/react-query";
import { projectDetailQueries } from "@/apis/projectDetail/projectDetail.queries";

const useProjectDetail = (id: number) => {
  const { data: projectDetail } = useQuery(
    projectDetailQueries.fetchDetail(id)
  );

  return projectDetail;
};

export default useProjectDetail;
