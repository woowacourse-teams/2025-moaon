import SortList from "@domains/components/SortList/SortList";
import { ARTICLE_SORT_MAP } from "@domains/sort/article";
import EmptyState from "@shared/components/EmptyState/EmptyState";
import useInfiniteScroll from "@shared/hooks/useInfiniteScroll";
import useArticleList from "../hooks/useArticleList";
import * as S from "./ArticleBox.styled";
import ArticleSkeletonList from "./ArticleSkeletonList/ArticleSkeletonList";
import Card from "./CardList/Card/Card";
import CardList from "./CardList/CardList";

const DEFAULT_SORT_TYPE = "createdAt";

function ArticleBox() {
  const {
    articles,
    hasNext,
    nextCursor,
    totalCount,
    fetchNextPage,
    showSkeleton,
    scrollEnabled,
    refetch,
    isLoading,
  } = useArticleList();

  const { targetRef } = useInfiniteScroll({
    hasNext,
    nextCursor,
    fetchNextPage,
    scrollEnabled,
  });

  const handleSelect = () => {
    refetch();
  };

  const hasCountToDisplay = (totalCount ?? 0) > 0;

  return (
    <S.ArticleContainer>
      <S.ArticleHeader>
        <S.ArticleIntro>
          {hasCountToDisplay && (
            <>
              <S.ArticleIntroText>{totalCount}개</S.ArticleIntroText>의 아티클이
              모여있어요.
            </>
          )}
        </S.ArticleIntro>
        {(isLoading || hasCountToDisplay) && (
          <SortList
            sortMap={ARTICLE_SORT_MAP}
            onSelect={handleSelect}
            initialValue={DEFAULT_SORT_TYPE}
          />
        )}
      </S.ArticleHeader>
      {showSkeleton && <ArticleSkeletonList />}
      {hasCountToDisplay ? (
        <CardList>
          {articles?.map((article) => (
            <Card key={article.id} article={article} />
          ))}
          {scrollEnabled && <div ref={targetRef} />}
        </CardList>
      ) : (
        !showSkeleton && (
          <S.EmptyContainer>
            <EmptyState title="조건에 맞는 아티클이 없어요." />
          </S.EmptyContainer>
        )
      )}
    </S.ArticleContainer>
  );
}

export default ArticleBox;
