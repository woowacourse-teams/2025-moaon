import * as S from "./Tag.styled";

interface TagBoxProps {
  Text: string;
}

function Tag({ Text }: TagBoxProps) {
  return (
    <S.TagBox>
      <S.TagText className="tag-text">{Text}</S.TagText>
    </S.TagBox>
  );
}

export default Tag;
