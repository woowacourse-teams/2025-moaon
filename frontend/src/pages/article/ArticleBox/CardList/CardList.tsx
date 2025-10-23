import EmptyState from "@shared/components/EmptyState/EmptyState";
import type { KeyboardEvent, Ref } from "react";
import { useRef } from "react";
import type { Article } from "@/apis/articles/articles.type";
import ArticleSkeletonList from "../ArticleSkeletonList/ArticleSkeletonList";
import ArticleCard from "./Card/ArticleCard";
import * as S from "./CardList.styled";

interface CardListProps {
  articles?: Article[];
  totalCount: number;
  showSkeleton: boolean;
  scrollEnabled: boolean;
  targetRef: Ref<HTMLDivElement>;
  isLoading: boolean;
}

function CardList({
  articles,
  totalCount,
  showSkeleton,
  scrollEnabled,
  targetRef,
  isLoading,
}: CardListProps) {
  const skipButtonRef = useRef<HTMLAnchorElement>(null);

  const handleKeyDownCapture = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "Tab" && e.repeat) {
      e.preventDefault();
      skipButtonRef.current?.focus();
    }
  };
  if (totalCount === 0 && !isLoading) {
    return (
      <S.EmptyContainer>
        <EmptyState title="조건에 맞는 아티클이 없어요." />
      </S.EmptyContainer>
    );
  }

  return (
    <S.CardListContainer onKeyDownCapture={handleKeyDownCapture}>
      {articles?.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
      {scrollEnabled && <div ref={targetRef} />}
      {showSkeleton && <ArticleSkeletonList />}
      <S.SkipToTitleButton
        ref={skipButtonRef}
        href="#article-page-title"
        aria-label="상단 제목으로 이동"
      >
        상단으로 이동
      </S.SkipToTitleButton>
    </S.CardListContainer>
  );
}

export default CardList;
