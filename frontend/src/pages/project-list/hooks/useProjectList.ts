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
    refetch: originalRefetch,
    isRefetching,
  } = useInfiniteQuery(projectQueries.fetchList());

  const projects = data?.pages.flatMap((page) => page.contents);

  // 첫 번째 페이지의 totalCount 사용
  const totalCount = data?.pages[0]?.totalCount;

  // 마지막 페이지의 정보 사용
  const hasNext = data?.pages[data.pages.length - 1]?.hasNext ?? false;
  const nextCursor = data?.pages[data.pages.length - 1]?.nextCursor ?? "";

  // 캐시를 초기화하고 첫 페이지만 다시 받아오는 커스텀 refetch 함수
  const refetch = async () => {
    // 기존 캐시 제거
    await queryClient.resetQueries({
      queryKey: projectQueries.all,
    });
    // 첫 페이지만 다시 받아오기
    return originalRefetch();
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
