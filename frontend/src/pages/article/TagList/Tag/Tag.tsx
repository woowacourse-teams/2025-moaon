import * as S from "./Tag.styled";

interface TagBoxProps {
  text: string;
  onSelect: () => void;
  isSelected: boolean;
}

function Tag({ text, onSelect, isSelected }: TagBoxProps) {
  return (
    <S.TagBox onClick={onSelect} isSelected={isSelected}>
      <S.TagText className="tag-text" isSelected={isSelected}>
        {text}
      </S.TagText>
    </S.TagBox>
  );
}

export default Tag;
