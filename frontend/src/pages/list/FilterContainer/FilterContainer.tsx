import { CATEGORY_ENTRY } from "@domains/filter/category";
import { TECH_STACK_ENTRY } from "@domains/filter/techStack";
import * as S from "./FilterContainer.styled";
import FilterTrigger from "./FilterTrigger/FilterTrigger";

const FILTER_INFO_LIST = [
  {
    kind: { label: "주제", param: "categories", hasSearchBar: false },
    entry: CATEGORY_ENTRY,
  },
  {
    kind: { label: "기술스택", param: "techStacks", hasSearchBar: true },
    entry: TECH_STACK_ENTRY,
  },
] as const;

export type FilterKind = (typeof FILTER_INFO_LIST)[number]["kind"];
export type FilterKindParam =
  (typeof FILTER_INFO_LIST)[number]["kind"]["param"];
export type FilterEntry = (typeof FILTER_INFO_LIST)[number]["entry"];

export const FILTER_MAP = FILTER_INFO_LIST.reduce(
  (acc, { kind, entry }) => {
    const { param } = kind;
    acc[param] = entry;
    return acc;
  },
  {} as Record<FilterKindParam, FilterEntry>,
);

function FilterContainer() {
  return (
    <S.Container>
      {FILTER_INFO_LIST.map(({ kind }) => (
        <FilterTrigger key={kind.label} kind={kind} />
      ))}
    </S.Container>
  );
}

export default FilterContainer;
