import { useMemo } from "react";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import useProjectList from "../hooks/useProjectList";
import Card from "./Card/Card";
import CardSkeleton from "./Card/CardSkeleton";
import * as S from "./CardList.styled";

const SKELETON_COUNT = 20;

function CardList() {
  const {
    projects,
    isLoading,
    hasNext,
    nextCursor,
    totalCount,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useProjectList();

  const enabled = !isLoading && hasNext && !isFetchingNextPage;

  const { targetRef } = useInfiniteScroll({
    hasNext,
    nextCursor,
    fetchNextPage,
    enabled,
  });

  // 스켈레톤 키 생성 (메모이제이션으로 불필요한 재생성 방지)
  const skeletonKeys = useMemo(
    () => Array.from({ length: SKELETON_COUNT }, () => crypto.randomUUID()),
    [],
  );

  return (
    <>
      <S.ProjectIntro>
        <S.ProjectIntroText>{totalCount ?? 0}개</S.ProjectIntroText>의
        프로젝트가 모여있어요.
      </S.ProjectIntro>
      <S.CardList>
        {/* 기존 프로젝트 카드들 */}
        {projects?.map((project) => (
          <Card key={project.id} project={project} />
        ))}

        {(isLoading || isFetchingNextPage || isRefetching) &&
          skeletonKeys.map((key) => <CardSkeleton key={key} />)}

        {/* 무한스크롤 트리거 요소 */}
        {enabled && <div ref={targetRef} />}
      </S.CardList>
    </>
  );
}

export default CardList;
