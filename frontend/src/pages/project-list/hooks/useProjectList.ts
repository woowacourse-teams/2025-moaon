import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { projectQueries } from "@/apis/projects/project.queries";
import useDelayedVisibility from "@/shared/hooks/useDelayedVisibility";

const useProjectList = () => {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(projectQueries.fetchList(search));

  const projects = data?.pages.flatMap((page) => page.contents);

  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const hasNext = data?.pages[data.pages.length - 1]?.hasNext ?? false;
  const nextCursor = data?.pages[data.pages.length - 1]?.nextCursor ?? "";

  const refetch = async () => {
    await queryClient.invalidateQueries({
      queryKey: projectQueries.all,
    });
  };

  const scrollEnabled = !isLoading && hasNext && !isFetchingNextPage;

  const showInitialSkeleton = useDelayedVisibility(isLoading);
  const showNextSkeleton = useDelayedVisibility(isFetchingNextPage);
  const showSkeleton = showInitialSkeleton || showNextSkeleton;

  return {
    projects,
    totalCount,
    nextCursor,
    fetchNextPage,
    refetch,
    hasNext,
    scrollEnabled,
    showSkeleton,
    isLoading,
  };
};

export default useProjectList;
