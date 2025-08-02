import type { CategoryKey, CategoryLabel } from "@domains/filter/category";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useState } from "react";
import useProjectList from "@/pages/list/hooks/useProjectList";
import * as S from "./CategoryFilterButton.styled";

interface CategoryFilterButtonProps {
  value: CategoryKey;
  label: CategoryLabel;
}

function CategoryFilterButton({ value, label }: CategoryFilterButtonProps) {
  const params = useSearchParams({
    key: "categories",
    mode: "multi",
  });
  const { refetch } = useProjectList();
  const [isSelected, setIsSelected] = useState(params.get().includes(value));

  const toggle = () => {
    setIsSelected((prev) => !prev);
  };

  const handleFilterButtonClick = (value: string) => {
    toggle();
    params.update(value);
    refetch();
  };

  return (
    <S.Button
      type="button"
      onClick={() => handleFilterButtonClick(value)}
      isSelected={isSelected}
    >
      {label}
    </S.Button>
  );
}

export default CategoryFilterButton;
