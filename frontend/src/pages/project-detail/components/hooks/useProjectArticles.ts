import { useQuery } from "@tanstack/react-query";
import { projectArticleQueries } from "@/apis/projectArticles/projectArticle.queries";

const useProjectArticles = (id: number) => {
  const { data, error, refetch, isRefetching, isLoading } = useQuery(
    projectArticleQueries.fetchList(id)
  );

  const projectArticles = data ?? [];

  return { projectArticles, error, refetch, isRefetching, isLoading };
};

export default useProjectArticles;
