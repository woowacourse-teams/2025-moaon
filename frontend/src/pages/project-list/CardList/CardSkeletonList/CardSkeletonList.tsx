import CardSkeleton from "./CardSkeleton/CardSkeleton";

const SKELETON_COUNT = 20;

function CardSkeletonList() {
  return (
    <ul aria-label="프로젝트 목록 로딩 스켈레톤">
      {Array.from({ length: SKELETON_COUNT }, () => (
        <CardSkeleton key={crypto.randomUUID()} />
      ))}
    </ul>
  );
}

export default CardSkeletonList;
