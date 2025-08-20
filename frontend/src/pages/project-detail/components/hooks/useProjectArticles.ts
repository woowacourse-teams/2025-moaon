import { useQuery } from "@tanstack/react-query";
import { projectArticleQueries } from "@/apis/projectArticles/projectArticle.queries";

const useProjectArticles = (id: number) => {
  const { data, error, refetch, isRefetching } = useQuery(
    projectArticleQueries.fetchList(id)
  );

  const projectArticles = data ?? [];

  return { projectArticles, error, refetch, isRefetching };
};

export default useProjectArticles;
