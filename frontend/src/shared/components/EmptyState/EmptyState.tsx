import emptyImage from "@assets/images/empty.png";
import * as S from "./EmptyState.styled";

interface EmptyStateProps {
  title?: string;
  description?: string;
  imageSrc?: string;
}

function EmptyState({
  title = "결과가 없어요.",
  description = "검색어나 필터를 바꿔 다시 시도해 보세요.",
  imageSrc = emptyImage,
}: EmptyStateProps) {
  return (
    <S.Container aria-live="polite">
      <S.Content>
        <S.Image src={imageSrc} alt="비어있는 상태를 나타내는 일러스트" />
        <S.Title>{title}</S.Title>
        {description && <S.Description>{description}</S.Description>}
      </S.Content>
    </S.Container>
  );
}

export default EmptyState;
