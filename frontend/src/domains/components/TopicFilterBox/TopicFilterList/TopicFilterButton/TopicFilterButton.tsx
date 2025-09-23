import type { AllTopicKey, AllTopicLabel } from "@domains/filter/articleTopic";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useEffect, useState } from "react";
import * as S from "./TopicFilterButton.styled";

interface TopicFilterButtonProps {
  value: AllTopicKey;
  label: AllTopicLabel;
  onSelect: () => void;
}

function TopicFilterButton({ value, label, onSelect }: TopicFilterButtonProps) {
  const params = useSearchParams({
    key: "topics",
    mode: "multi",
  });
  const selectedCategories = params.get();
  const [isSelected, setIsSelected] = useState(() =>
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

export default TopicFilterButton;
