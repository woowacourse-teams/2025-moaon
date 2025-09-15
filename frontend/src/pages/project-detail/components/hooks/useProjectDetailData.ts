import { useSuspenseQueries } from "@tanstack/react-query";
import { projectArticleQueries } from "@/apis/projectArticles/projectArticle.queries";
import { projectDetailQueries } from "@/apis/projectDetail/projectDetail.queries";

const useProjectDetailData = (id: number) => {
  const [
    { data: projectDetail },
    {
      data: projectArticles,
      refetch: projectArticleRefetch,
      isRefetching: isProjectArticleRefetching,
      isLoading: isProjectArticleLoading,
    },
  ] = useSuspenseQueries({
    queries: [
      {
        ...projectDetailQueries.fetchDetail(id),
      },
      {
        ...projectArticleQueries.fetchList(id),
      },
    ],
  });

  return {
    projectDetail,
    projectArticles,
    projectArticleRefetch,
    isProjectArticleRefetching,
    isProjectArticleLoading,
  };
};

export default useProjectDetailData;
