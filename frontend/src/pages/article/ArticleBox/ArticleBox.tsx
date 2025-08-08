import SortList from "@domains/components/SortList/SortList";
import { ARTICLE_SORT_MAP } from "@domains/sort/article";
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

  const hasTotalCount = totalCount !== undefined;
  const hasCountToDisplay = hasTotalCount && totalCount > 0;

  return (
    <S.ArticleContainer>
      <S.ArticleHeader hasTotalCount={hasTotalCount}>
        {hasCountToDisplay && (
          <>
            <S.ArticleIntro>
              <S.ArticleIntroText>{totalCount}개</S.ArticleIntroText>의 아티클이
              모여있어요.
            </S.ArticleIntro>
            <SortList
              sortMap={ARTICLE_SORT_MAP}
              onSelect={handleSelect}
              initialValue={DEFAULT_SORT_TYPE}
            />
          </>
        )}
      </S.ArticleHeader>
      {showSkeleton && <ArticleSkeletonList />}
      <CardList>
        {articles?.map((article) => (
          <Card key={article.id} article={article} />
        ))}
        {scrollEnabled && <div ref={targetRef} />}
      </CardList>
    </S.ArticleContainer>
  );
}

export default ArticleBox;
