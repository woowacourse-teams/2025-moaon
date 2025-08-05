import * as S from "./SortItem.styled";

interface SortItemProps {
  sortValue: string;
  isSelected: boolean;
  onSelect: () => void;
}

function SortItem({ sortValue, isSelected, onSelect }: SortItemProps) {
  return (
    <S.Item>
      <S.Button
        type="button"
        onClick={() => onSelect()}
        isSelected={isSelected}
      >
        {sortValue}
      </S.Button>
    </S.Item>
  );
}

export default SortItem;
