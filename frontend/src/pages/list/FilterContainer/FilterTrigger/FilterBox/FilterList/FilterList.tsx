import type { CategoryEntry } from "@domains/filter/category";
import type { OrganizationEntry } from "@domains/filter/organization";
import type { PlatformEntry } from "@domains/filter/platform";
import type { TechStackEntry } from "@domains/filter/techStack";
import type { FilterKindParam } from "../../../FilterContainer";
import FilterButton from "./FilterButton/FilterButton";
import * as S from "./FilterList.styled";

interface FilterListProps {
  list: (TechStackEntry | PlatformEntry | CategoryEntry | OrganizationEntry)[];
  param: FilterKindParam;
}

function FilterList({ list, param }: FilterListProps) {
  return (
    <S.List>
      {list.map(([key, entryValue]) => {
        const { label, imgUrl } = entryValue;
        return (
          <FilterButton
            key={key}
            label={label}
            imgUrl={imgUrl}
            param={param}
            value={key}
          />
        );
      })}
    </S.List>
  );
}

export default FilterList;
