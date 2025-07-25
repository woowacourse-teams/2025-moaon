import type { PlatformEntry } from "@domains/filter/platform";
import type { TechStackEntry } from "@domains/filter/techStack";
import IconBadge from "@shared/components/IconBadgeList/IconBadge/IconBadge";
import useSearchParams from "@/shared/hooks/useSearchParams";
import type { FilterKindValue } from "../../../FilterContainer";
import * as S from "./FilterList.styled";

interface FilterListProps {
  items: (TechStackEntry | PlatformEntry)[];
  value: FilterKindValue;
}

function FilterList({ items, value }: FilterListProps) {
  const techStack = useSearchParams({
    key: value,
    mode: "multi",
  });

  return (
    <S.List>
      {items.map(([key, value]) => {
        const { label, imgUrl } = value;
        return (
          <div key={key}>
            <IconBadge label={label} imgUrl={imgUrl} />
          </div>
        );
      })}
      {/* <FilterItem onClick={() => techStack.update("1")} />
      <FilterItem onClick={() => techStack.update("2")} />
      <FilterItem onClick={() => techStack.update("3")} />
      <FilterItem onClick={() => techStack.update("4")} />
      <FilterItem onClick={() => techStack.update("5")} /> */}
    </S.List>
  );
}

export default FilterList;
