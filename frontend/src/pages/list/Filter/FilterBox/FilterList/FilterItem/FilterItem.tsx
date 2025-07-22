import * as S from "./FilterItem.styled";

interface FilterItemProps {
  iconUrl?: string;
  onClick?: () => void;
}

function FilterItem({ iconUrl, onClick }: FilterItemProps) {
  return (
    <S.Item onClick={onClick}>
      {iconUrl && <img src="" alt="" />}FilterItem
    </S.Item>
  );
}

export default FilterItem;
