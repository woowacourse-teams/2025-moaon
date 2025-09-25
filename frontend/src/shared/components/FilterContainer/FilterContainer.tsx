import type { ReactElement } from "react";
import * as S from "./FilterContainer.styled";
import FilterTrigger from "./FilterTrigger/FilterTrigger";

interface FilterContainerProps {
  filterList: {
    label: string;
    param: string;
    render: (onSelect: () => void) => ReactElement;
  }[];
  onSelect: () => void;
}

function FilterContainer({ filterList, onSelect }: FilterContainerProps) {
  return (
    <S.Container>
      {filterList.map(({ label, param, render }) => {
        return (
          <FilterTrigger
            key={label}
            label={label}
            param={param}
            onSelect={onSelect}
          >
            {render(onSelect)}
          </FilterTrigger>
        );
      })}
    </S.Container>
  );
}

export default FilterContainer;
