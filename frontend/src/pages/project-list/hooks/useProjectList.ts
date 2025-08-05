import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { projectQueries } from "@/apis/projects/project.queries";
import type { ProjectCard } from "@/apis/projects/projects.type";

const useProjectList = () => {
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const { data, isLoading, refetch } = useQuery(projectQueries.fetchList());

  useEffect(() => {
    setProjects((prev) => [...prev, ...(data?.contents ?? [])]);
  }, [data?.contents]);

  // 첫 번째 페이지의 totalCount 사용
  const totalCount = data?.totalCount;

  // 마지막 페이지의 정보 사용
  const hasNext = data?.hasNext ?? false;
  const nextCursor = data?.nextCursor;

  return {
    projects,
    totalCount,
    hasNext,
    nextCursor,
    isLoading,
    refetch,
  };
};

export default useProjectList;
