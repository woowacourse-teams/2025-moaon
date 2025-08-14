import EmptyState from "@shared/components/EmptyState/EmptyState";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import useProjectList from "../hooks/useProjectList";
import Card from "./Card/Card";
import * as S from "./CardList.styled";
import CardSkeletonList from "./CardSkeletonList/CardSkeletonList";

function CardList() {
  const {
    projects,
    hasNext,
    nextCursor,
    totalCount,
    fetchNextPage,
    scrollEnabled,
    showSkeleton,
  } = useProjectList();

  const { targetRef } = useInfiniteScroll({
    hasNext,
    nextCursor,
    fetchNextPage,
    scrollEnabled,
  });

  return (
    <section aria-label="프로젝트 목록">
      {totalCount > 0 && (
        <S.ProjectIntro>
          <S.ProjectIntroText>{totalCount}개</S.ProjectIntroText>의 프로젝트가
          모여있어요.
        </S.ProjectIntro>
      )}
      {showSkeleton && <CardSkeletonList />}
      {totalCount > 0 ? (
        <S.CardList>
          {projects?.map((project) => (
            <Card key={project.id} project={project} />
          ))}
          {scrollEnabled && <div ref={targetRef} />}
        </S.CardList>
      ) : (
        !showSkeleton && <EmptyState title="조건에 맞는 프로젝트가 없어요." />
      )}
    </section>
  );
}

export default CardList;
