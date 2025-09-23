import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import { toast } from "@shared/components/Toast/toast";
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
  const rawSector = params.get("sector");

  const validSectors = ARTICLE_SECTOR_ENTRY.map(([key]) => key);
  const isRealSector = validSectors.includes(rawSector as ArticleSectorKey);

  const sector: ArticleSectorKey = isRealSector
    ? (rawSector as ArticleSectorKey)
    : "all";

  if (rawSector && !isRealSector) {
    toast.warning("존재하지 않는 분야입니다.");
    params.set("sector", "all");
    const newSearch = params.toString();
    const newPath = location.pathname + "?" + newSearch;
    window.history.replaceState({}, "", newPath);
  }

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
