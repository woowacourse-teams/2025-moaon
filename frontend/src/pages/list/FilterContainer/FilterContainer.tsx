import { CATEGORY_ENTRY } from "@domains/filter/category";
import { PLATFORM_ENTRY } from "@domains/filter/platform";
import { TECH_STACK_ENTRY } from "@domains/filter/techStack";
import * as S from "./FilterContainer.styled";
import Filter from "./FilterTrigger/FilterTrigger";

const FILTER_INFO_LIST = [
  { kind: { label: "주제", param: "categories" }, entry: CATEGORY_ENTRY },
  { kind: { label: "기술스택", param: "techStacks" }, entry: TECH_STACK_ENTRY },
  { kind: { label: "플랫폼", param: "platforms" }, entry: PLATFORM_ENTRY },
] as const;

export type FilterKind = (typeof FILTER_INFO_LIST)[number]["kind"];
export type FilterKindParam =
  (typeof FILTER_INFO_LIST)[number]["kind"]["param"];
type FilterEntry = (typeof FILTER_INFO_LIST)[number]["entry"];

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
        <Filter key={kind.label} kind={kind} />
      ))}
    </S.Container>
  );
}

export default FilterContainer;
