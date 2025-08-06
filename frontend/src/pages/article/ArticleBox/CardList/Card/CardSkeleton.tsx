import * as S from "./Card.styled";

function CardSkeleton() {
  return (
    <S.CardContainer>
      <S.SkeletonBadge />
      <S.SkeletonCardTitle />
      <S.SkeletonCardSummary />
      <S.SkeletonTechStacks>
        <S.SkeletonTechStack />
        <S.SkeletonTechStack />
        <S.SkeletonTechStack />
      </S.SkeletonTechStacks>
    </S.CardContainer>
  );
}

export default CardSkeleton;
