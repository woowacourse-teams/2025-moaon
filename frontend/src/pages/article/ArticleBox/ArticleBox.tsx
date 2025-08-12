import useInfiniteScroll from "@shared/hooks/useInfiniteScroll";
import useArticleList from "../hooks/useArticleList";
import * as S from "./ArticleBox.styled";
import ArticleBoxContent from "./components/ArticleBoxContent/ArticleBoxContent";
import ArticleBoxHeader from "./components/ArticleBoxHeader/ArticleBoxHeader";

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

  return (
    <S.ArticleBoxContainer>
      <ArticleBoxHeader
        totalCount={totalCount}
        isLoading={isLoading}
        onSelectSort={handleSelect}
        initialSort={DEFAULT_SORT_TYPE}
      />
      <ArticleBoxContent
        articles={articles}
        totalCount={totalCount}
        showSkeleton={showSkeleton}
        scrollEnabled={scrollEnabled}
        targetRef={targetRef}
      />
    </S.ArticleBoxContainer>
  );
}

export default ArticleBox;
