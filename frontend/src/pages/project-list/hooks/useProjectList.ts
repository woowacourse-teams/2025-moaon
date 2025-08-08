import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { projectQueries } from "@/apis/projects/project.queries";

const useProjectList = () => {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(projectQueries.fetchList());

  const projects = data?.pages.flatMap((page) => page.contents);

  const totalCount = data?.pages[0]?.totalCount;

  const hasNext = data?.pages[data.pages.length - 1]?.hasNext ?? false;
  const nextCursor = data?.pages[data.pages.length - 1]?.nextCursor ?? "";

  const refetch = async () => {
    await queryClient.resetQueries({
      queryKey: projectQueries.all,
    });
  };

  const scrollEnabled = !isLoading && hasNext && !isFetchingNextPage;
  const showSkeleton = isLoading || isFetchingNextPage || isRefetching;

  return {
    projects,
    totalCount,
    nextCursor,
    fetchNextPage,
    refetch,
    hasNext,
    isRefetching,
    scrollEnabled,
    showSkeleton,
  };
};

export default useProjectList;
