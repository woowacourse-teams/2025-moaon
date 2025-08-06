import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { articlesQueries } from "@/apis/articles/articles.queries";

const useArticleList = () => {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: originalRefetch,
    isRefetching,
  } = useInfiniteQuery(articlesQueries.fetchList());

  const articles = data?.pages.flatMap((page) => page.articleContents);

  const totalCount = data?.pages[0]?.totalCount;

  const hasNext = data?.pages[data.pages.length - 1]?.hasNext ?? false;
  const nextCursor = data?.pages[data.pages.length - 1]?.nextCursor ?? "";

  const refetch = async () => {
    await queryClient.resetQueries({
      queryKey: articlesQueries.all,
    });

    return originalRefetch();
  };

  return {
    articles,
    totalCount,
    hasNext,
    nextCursor,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  };
};

export default useArticleList;
