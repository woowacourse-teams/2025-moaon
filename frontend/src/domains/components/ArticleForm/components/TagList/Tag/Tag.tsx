import * as S from "./Tag.styled";

interface TagProps {
  title: string;
}

function Tag({ title }: TagProps) {
  return (
    <S.Tag>
      <S.TagButton type="button">{title}</S.TagButton>
    </S.Tag>
  );
}

export default Tag;
