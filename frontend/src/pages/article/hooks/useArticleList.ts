import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { articlesQueries } from "@/apis/articles/articles.queries";
import useDelayedVisibility from "@/shared/hooks/useDelayedVisibility";

const useArticleList = () => {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(articlesQueries.fetchList(search));

  const articles = data?.pages.flatMap((page) => page.contents);

  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const hasNext = data?.pages[data.pages.length - 1]?.hasNext ?? false;
  const nextCursor = data?.pages[data.pages.length - 1]?.nextCursor ?? "";

  const scrollEnabled = !isLoading && hasNext && !isFetchingNextPage;

  const showInitialSkeleton = useDelayedVisibility(isLoading);
  const showNextSkeleton = useDelayedVisibility(isFetchingNextPage);
  const showSkeleton = showInitialSkeleton || showNextSkeleton;

  const refetch = async () => {
    await queryClient.invalidateQueries({
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
