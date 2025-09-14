import * as S from "./FilterContainer.styled";
import FilterTrigger from "./FilterTrigger/FilterTrigger";

const FILTER_LABEL_LIST = [
  { label: "주제", param: "topics" },
  { label: "기술 스택", param: "techStacks" },
] as const;

export type FilterLabel = (typeof FILTER_LABEL_LIST)[number]["label"];
export type FilterParam = (typeof FILTER_LABEL_LIST)[number]["param"];

interface FilterContainerProps {
  onSelect: () => void;
}

function FilterContainer({ onSelect }: FilterContainerProps) {
  return (
    <S.Container>
      {FILTER_LABEL_LIST.map(({ label, param }) => (
        <FilterTrigger
          key={label}
          label={label}
          param={param}
          onSelect={onSelect}
        />
      ))}
    </S.Container>
  );
}

export default FilterContainer;
