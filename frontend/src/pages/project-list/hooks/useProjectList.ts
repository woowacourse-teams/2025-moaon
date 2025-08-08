import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { projectQueries } from "@/apis/projects/project.queries";

const useProjectList = () => {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
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

  return {
    projects,
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

export default useProjectList;
