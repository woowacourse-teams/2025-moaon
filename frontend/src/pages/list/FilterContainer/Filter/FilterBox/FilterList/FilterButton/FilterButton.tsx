import IconBadge from "@shared/components/IconBadgeList/IconBadge/IconBadge";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useState } from "react";
import type { FilterKindParam } from "@/pages/list/FilterContainer/FilterContainer";
import * as S from "./FilterButton.styled";

interface FilterButtonProps {
  value: string;
  label: string;
  imgUrl: string;
  param: FilterKindParam;
}

function FilterButton({ value, label, imgUrl, param }: FilterButtonProps) {
  const [isSelected, setIsSelected] = useState(false);
  const params = useSearchParams({
    key: param,
    mode: "multi",
  });

  const toggle = () => {
    setIsSelected((prev) => !prev);
  };

  const handleFilterButtonClick = (value: string) => {
    toggle();
    params.update(value);
  };

  return (
    <S.Button
      type="button"
      onClick={() => handleFilterButtonClick(value)}
      isSelected={isSelected}
    >
      <IconBadge label={label} imgUrl={imgUrl} fontSize={18} iconsSize={18} />
    </S.Button>
  );
}

export default FilterButton;
