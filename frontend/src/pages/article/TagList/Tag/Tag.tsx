import * as S from "./Tag.styled";

interface TagBoxProps {
  text: string;
}

function Tag({ text }: TagBoxProps) {
  return (
    <S.TagBox>
      <S.TagText className="tag-text">{text}</S.TagText>
    </S.TagBox>
  );
}

export default Tag;
