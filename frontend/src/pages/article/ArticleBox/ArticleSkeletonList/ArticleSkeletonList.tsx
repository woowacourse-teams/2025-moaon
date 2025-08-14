import ArticleSkeleton from "./ArticleSkeleton/ArticleSkeleton";
import * as S from "./ArticleSkeletonList.styled";

const SKELETON_COUNT = 20;

function ArticleSkeletonList() {
  return (
    <S.SkeletonListContainer>
      {Array.from({ length: SKELETON_COUNT }, () => (
        <ArticleSkeleton key={crypto.randomUUID()} />
      ))}
    </S.SkeletonListContainer>
  );
}

export default ArticleSkeletonList;
