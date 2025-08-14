import { useQuery } from "@tanstack/react-query";
import { projectArticleQueries } from "@/apis/projectArticles/projectArticle.queries";

const useProjectArticles = (id: number) => {
  const {
    data: projectArticles,
    error,
    refetch,
    isRefetching,
  } = useQuery(projectArticleQueries.fetchList(id));

  return { projectArticles, error, refetch, isRefetching };
};

export default useProjectArticles;
