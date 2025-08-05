import { useMemo } from "react";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import useProjectList from "../hooks/useProjectList";
import Card from "./Card/Card";
import CardSkeleton from "./Card/CardSkeleton";
import * as S from "./CardList.styled";

function CardList() {
  const { projects, isLoading, hasNext, nextCursor, totalCount, refetch } =
    useProjectList();

  const { targetRef } = useInfiniteScroll({
    hasNext,
    nextCursor,
    refetch,
    enabled: !isLoading,
  });

  // 스켈레톤 카드 개수 상수
  const SKELETON_COUNT = 20;

  // 스켈레톤 키 생성 (메모이제이션으로 불필요한 재생성 방지)
  const skeletonKeys = useMemo(
    () => Array.from({ length: SKELETON_COUNT }, () => crypto.randomUUID()),
    [],
  );

  return (
    <>
      {totalCount && totalCount > 0 ? (
        <div>총 {totalCount}개의 프로젝트가 있어요.</div>
      ) : (
        <div>프로젝트가 없어요.</div>
      )}
      <S.CardList>
        {/* 기존 프로젝트 카드들 */}
        {projects?.map((project) => (
          <Card key={project.id} project={project} />
        ))}

        {isLoading && skeletonKeys.map((key) => <CardSkeleton key={key} />)}

        {/* 무한스크롤 트리거 요소 */}
        {hasNext && !isLoading && <div ref={targetRef} />}
      </S.CardList>
    </>
  );
}

export default CardList;
