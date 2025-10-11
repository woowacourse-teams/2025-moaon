import * as S from "./Tag.styled";

interface TagProps {
  title: string;
  isActive: boolean;
  onClick?: () => void;
}

function Tag({ title, isActive, onClick }: TagProps) {
  return (
    <S.Tag>
      <S.TagButton type="button" isActive={isActive} onClick={onClick}>
        {title}
      </S.TagButton>
    </S.Tag>
  );
}

export default Tag;
