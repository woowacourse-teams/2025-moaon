import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { projectQueries } from "@/apis/projects/project.queries";
import useDelayedVisibility from "@/shared/hooks/useDelayedVisibility";

const useProjectList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(projectQueries.fetchList());

  const projects = data?.pages.flatMap((page) => page.contents);

  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const hasNext = data?.pages[data.pages.length - 1]?.hasNext ?? false;
  const nextCursor = data?.pages[data.pages.length - 1]?.nextCursor ?? "";

  const refetch = async () => {
    await queryClient.resetQueries({
      queryKey: projectQueries.all,
    });
  };

  const scrollEnabled = !isLoading && hasNext && !isFetchingNextPage;
  // 짧은 로딩에는 스켈레톤을 숨기고, 일정 시간(300ms) 이상 지속될 때만 노출
  const showInitialSkeleton = useDelayedVisibility(isLoading, { delayMs: 300 });
  const showNextSkeleton = useDelayedVisibility(isFetchingNextPage, {
    delayMs: 300,
  });
  const showSkeleton = showInitialSkeleton || showNextSkeleton;

  return {
    projects,
    totalCount,
    nextCursor,
    fetchNextPage,
    refetch,
    hasNext,
    isLoading,
    scrollEnabled,
    showSkeleton,
  };
};

export default useProjectList;
