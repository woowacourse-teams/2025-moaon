import * as S from "./ArticleSkeleton.styled";

function ArticleSkeleton() {
  return (
    <S.SkeletonContainer>
      <S.SkeletonBadge />
      <S.SkeletonCardTitle />
      <S.SkeletonCardSummary />
      <S.SkeletonTechStacks>
        <S.SkeletonTechStack />
        <S.SkeletonTechStack />
        <S.SkeletonTechStack />
      </S.SkeletonTechStacks>
    </S.SkeletonContainer>
  );
}

export default ArticleSkeleton;
