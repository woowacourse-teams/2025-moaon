import EmptyState from "@shared/components/EmptyState/EmptyState";
import type { Ref } from "react";
import type { Article } from "@/apis/articles/articles.type";
import * as S from "../../ArticleBox.styled";
import ArticleSkeletonList from "../../ArticleSkeletonList/ArticleSkeletonList";
import Card from "../../CardList/Card/Card";
import CardList from "../../CardList/CardList";

interface ArticleBoxContentProps {
  articles?: Article[];
  totalCount: number;
  showSkeleton: boolean;
  scrollEnabled: boolean;
  targetRef: Ref<HTMLDivElement>;
}

function ArticleBoxContent({
  articles,
  totalCount,
  showSkeleton,
  scrollEnabled,
  targetRef,
}: ArticleBoxContentProps) {
  if (showSkeleton) {
    return <ArticleSkeletonList />;
  }

  if (totalCount === 0) {
    return (
      <S.EmptyContainer>
        <EmptyState title="조건에 맞는 아티클이 없어요." />
      </S.EmptyContainer>
    );
  }

  return (
    <CardList>
      {articles?.map((article) => (
        <Card key={article.id} article={article} />
      ))}
      {scrollEnabled && <div ref={targetRef} />}
    </CardList>
  );
}

export default ArticleBoxContent;
