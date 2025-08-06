import type { PropsWithChildren } from "react";
import * as S from "./Tag.styled";

interface TagBoxProps {
  onSelect: () => void;
  isSelected: boolean;
}

function Tag({
  children,
  onSelect,
  isSelected,
}: PropsWithChildren<TagBoxProps>) {
  return (
    <S.TagBox onClick={onSelect} isSelected={isSelected}>
      <S.TagText className="tag-text" isSelected={isSelected}>
        {children}
      </S.TagText>
    </S.TagBox>
  );
}

export default Tag;
