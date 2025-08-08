import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { articlesQueries } from "@/apis/articles/articles.queries";

const useArticleList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, fetchNextPage, isFetchingNextPage, isRefetching } =
    useInfiniteQuery(articlesQueries.fetchList());

  const articles = data?.pages.flatMap((page) => page.contents);

  const totalCount = data?.pages[0]?.totalCount;

  const hasNext = data?.pages[data.pages.length - 1]?.hasNext ?? false;
  const nextCursor = data?.pages[data.pages.length - 1]?.nextCursor ?? "";

  const scrollEnabled = !isLoading && hasNext && !isFetchingNextPage;
  const showSkeleton = isLoading || isFetchingNextPage || isRefetching;

  const refetch = async () => {
    await queryClient.resetQueries({
      queryKey: articlesQueries.all,
    });
  };

  return {
    articles,
    hasNext,
    nextCursor,
    totalCount,
    fetchNextPage,
    showSkeleton,
    scrollEnabled,
    refetch,
  };
};

export default useArticleList;
