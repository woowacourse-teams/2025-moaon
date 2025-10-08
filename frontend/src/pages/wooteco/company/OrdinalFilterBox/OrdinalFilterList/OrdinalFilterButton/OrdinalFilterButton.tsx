import useSearchParams from "@shared/hooks/useSearchParams";
import { useEffect, useState } from "react";
import * as S from "./OrdinalFilterButton.styled";

interface OrdinalFilterButtonProps {
  value: string;
  label: string;
  onSelect: () => void;
}

function OrdinalFilterButton({
  value,
  label,
  onSelect,
}: OrdinalFilterButtonProps) {
  const params = useSearchParams({
    key: "ordinals",
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

export default OrdinalFilterButton;
