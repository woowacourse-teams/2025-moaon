import type {
  ProjectCategoryKey,
  ProjectCategoryLabel,
} from "@domains/filter/projectCategory";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useEffect, useState } from "react";
import * as S from "./CategoryFilterButton.styled";

interface CategoryFilterButtonProps {
  value: ProjectCategoryKey;
  label: ProjectCategoryLabel;
  onSelect: () => void;
}

function CategoryFilterButton({
  value,
  label,
  onSelect,
}: CategoryFilterButtonProps) {
  const params = useSearchParams({
    key: "categories",
    mode: "multi",
  });
  const selectedCategories = params.get();
  const [isSelected, setIsSelected] = useState(
    selectedCategories.includes(value),
  );

  useEffect(() => {
    setIsSelected(selectedCategories.includes(value));
  }, [selectedCategories, value]);

  const toggle = () => {
    setIsSelected((prev) => !prev);
  };

  const handleFilterButtonClick = (value: string) => {
    toggle();
    params.update(value, { replace: true });
    onSelect();
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
