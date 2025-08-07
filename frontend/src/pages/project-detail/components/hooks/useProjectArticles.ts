import { useQuery } from "@tanstack/react-query";
import { projectArticleQueries } from "@/apis/projectArticles/projectArticle.queries";

const useProjectArticles = (id: number) => {
  const {
    data: projectArticles,
    isLoading,
    error,
  } = useQuery(projectArticleQueries.fetchList(id));

  return { projectArticles, isLoading, error };
};

export default useProjectArticles;
