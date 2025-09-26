import * as S from "./CardSkeleton.styled";

function CardSkeleton() {
  return (
    <S.SkeletonCard>
      <S.SkeletonImageBox />
      <S.SkeletonInfo>
        <S.SkeletonTitle />
        <S.SkeletonSummary />
        <S.SkeletonTechStacks>
          <S.SkeletonTechStack />
          <S.SkeletonTechStack />
          <S.SkeletonTechStack />
        </S.SkeletonTechStacks>
      </S.SkeletonInfo>
    </S.SkeletonCard>
  );
}

export default CardSkeleton;
