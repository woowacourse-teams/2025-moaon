import SortList from "@domains/components/SortList/SortList";
import { ARTICLE_SORT_MAP } from "@domains/sort/article";
import useInfiniteScroll from "@shared/hooks/useInfiniteScroll";
import { useMemo } from "react";
import useArticleList from "../hooks/useArticleList";
import * as S from "./ArticleBox.styled";
import Card from "./CardList/Card/Card";
import CardSkeleton from "./CardList/Card/CardSkeleton";
import CardList from "./CardList/CardList";

const DEFAULT_SORT_TYPE = "createdAt";
const SKELETON_COUNT = 20;

function ArticleBox() {
  const {
    articles,
    isLoading,
    hasNext,
    nextCursor,
    totalCount,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
  } = useArticleList();

  const scrollEnabled = !isLoading && hasNext && !isFetchingNextPage;
  const showSkeleton = isLoading || isFetchingNextPage || isRefetching;

  const { targetRef } = useInfiniteScroll({
    hasNext,
    nextCursor,
    fetchNextPage,
    scrollEnabled,
  });

  const skeletonKeys = useMemo(
    () => Array.from({ length: SKELETON_COUNT }, () => crypto.randomUUID()),
    [],
  );

  const handleSelect = () => {
    refetch();
  };

  return (
    <S.ArticleContainer>
      <S.ArticleHeader>
        <S.ArticleIntro>
          <S.ArticleIntroText>{totalCount}개</S.ArticleIntroText>의 아티클이
          모여있어요.
        </S.ArticleIntro>
        <SortList<typeof ARTICLE_SORT_MAP>
          sortMap={ARTICLE_SORT_MAP}
          onSelect={handleSelect}
          initialValue={DEFAULT_SORT_TYPE}
        />
      </S.ArticleHeader>
      <CardList>
        {articles?.map((article) => (
          <Card key={article.id} article={article} />
        ))}

        {showSkeleton && skeletonKeys.map((key) => <CardSkeleton key={key} />)}

        {scrollEnabled && <div ref={targetRef} />}
      </CardList>
    </S.ArticleContainer>
  );
}

export default ArticleBox;
