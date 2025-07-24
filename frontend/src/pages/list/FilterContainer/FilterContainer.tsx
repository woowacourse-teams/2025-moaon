import { PLATFORM_ENTRY } from "@domains/filter/platform";
import { TECH_STACK_ENTRY } from "@domains/filter/techStack";
import Filter from "./Filter/Filter";
import * as S from "./FilterContainer.styled";

const FILTER_INFO_LIST = [
  { kind: { label: "기술스택", value: "techStack" }, entry: TECH_STACK_ENTRY },
  { kind: { label: "플랫폼", value: "platform" }, entry: PLATFORM_ENTRY },
  { kind: { label: "단체", value: "organizations" }, entry: PLATFORM_ENTRY },
  { kind: { label: "주제", value: "category" }, entry: PLATFORM_ENTRY },
] as const;
export type FilterKind = (typeof FILTER_INFO_LIST)[number]["kind"];
export type FilterKindValue =
  (typeof FILTER_INFO_LIST)[number]["kind"]["value"];
type FilterEntry = (typeof FILTER_INFO_LIST)[number]["entry"];

export const FILTER_MAP = FILTER_INFO_LIST.reduce(
  (acc, { kind, entry }) => {
    const { value } = kind;
    acc[value] = entry;
    return acc;
  },
  {} as Record<FilterKindValue, FilterEntry>,
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
