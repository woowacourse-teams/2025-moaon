import { useLocation } from "react-router";
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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sector = params.get("sector");

  return (
    <S.Container>
      {FILTER_LABEL_LIST.map(({ label, param }) => {
        if (label === "기술 스택" && sector === "nonTech") {
          return null;
        }

        return (
          <FilterTrigger
            key={label}
            label={label}
            param={param}
            onSelect={onSelect}
            sector={sector}
          />
        );
      })}
    </S.Container>
  );
}

export default FilterContainer;
