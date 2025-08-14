import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { articlesQueries } from "@/apis/articles/articles.queries";
import useDelayedVisibility from "@/shared/hooks/useDelayedVisibility";

const useArticleList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(articlesQueries.fetchList());

  const articles = data?.pages.flatMap((page) => page.contents);

  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const hasNext = data?.pages[data.pages.length - 1]?.hasNext ?? false;
  const nextCursor = data?.pages[data.pages.length - 1]?.nextCursor ?? "";

  const scrollEnabled = !isLoading && hasNext && !isFetchingNextPage;
  const showInitialSkeleton = useDelayedVisibility(isLoading, { delayMs: 300 });
  const showNextSkeleton = useDelayedVisibility(isFetchingNextPage, {
    delayMs: 300,
  });
  const showSkeleton = showInitialSkeleton || showNextSkeleton;

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
    isLoading,
  };
};

export default useArticleList;
