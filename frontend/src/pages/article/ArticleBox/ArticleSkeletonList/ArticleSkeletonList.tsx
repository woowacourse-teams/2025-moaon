import ArticleSkeleton from "./ArticleSkeleton/ArticleSkeleton";

const SKELETON_COUNT = 20;

function ArticleSkeletonList() {
  return (
    <>
      {Array.from({ length: SKELETON_COUNT }, () => (
        <ArticleSkeleton key={crypto.randomUUID()} />
      ))}
    </>
  );
}

export default ArticleSkeletonList;
