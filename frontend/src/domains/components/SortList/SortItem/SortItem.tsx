import type { PropsWithChildren } from "react";
import * as S from "./SortItem.styled";

interface SortItemProps {
  isSelected: boolean;
  onSelect: () => void;
}

function SortItem({
  isSelected,
  onSelect,
  children,
}: PropsWithChildren<SortItemProps>) {
  return (
    <S.Item>
      <S.Button type="button" onClick={onSelect} isSelected={isSelected}>
        {children}
      </S.Button>
    </S.Item>
  );
}

export default SortItem;
