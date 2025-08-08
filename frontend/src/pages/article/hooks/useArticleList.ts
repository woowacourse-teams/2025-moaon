import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { articlesQueries } from "@/apis/articles/articles.queries";

const useArticleList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, fetchNextPage, isFetchingNextPage, refetch: originalRefetch, isRefetching } = useInfiniteQuery(articlesQueries.fetchList());

  const postArticleClickMutation = useMutation(articlesQueries.postArticleClick());

  const articles = data?.pages.flatMap((page) => page.contents);

  const totalCount = data?.pages[0]?.totalCount;

  const hasNext = data?.pages[data.pages.length - 1]?.hasNext ?? false;
  const nextCursor = data?.pages[data.pages.length - 1]?.nextCursor ?? "";

  const refetch = async () => {
    await queryClient.resetQueries({
      queryKey: articlesQueries.all,
    });

    return originalRefetch();
  };

  const scrollEnabled = !isLoading && hasNext && !isFetchingNextPage;
  const showSkeleton = isLoading || isFetchingNextPage || isRefetching;

  const postArticleClick = (id: number) => {
    postArticleClickMutation.mutate(id);
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
    postArticleClick,
  };
};

export default useArticleList;
