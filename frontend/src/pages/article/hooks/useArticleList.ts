import { useQuery } from "@tanstack/react-query";
import { articlesQueries } from "@/apis/articles/articles.queries";

const useArticleList = () => {
  const {
    data: articles,
    isLoading,
    refetch,
  } = useQuery(articlesQueries.fetchList());

  return { articles, isLoading, refetch };
};

export default useArticleList;
