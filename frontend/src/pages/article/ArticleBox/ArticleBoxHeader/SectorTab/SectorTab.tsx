import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useTabAnimation } from "@shared/hooks/useTabAnimation";
import * as S from "./SectorTab.styled";

function SectorTab({
  onSelect,
}: {
  onSelect: (sector: ArticleSectorKey) => void;
}) {
  const params = useSearchParams({
    key: "sector",
    mode: "single",
  });
  const rawSelectedParams = params.get()[0] ?? ARTICLE_SECTOR_ENTRY[0][0];
  const selectedIndex = ARTICLE_SECTOR_ENTRY.findIndex(
    ([key]) => key === rawSelectedParams,
  );
  const { setTabElementsRef, selectedStyle } = useTabAnimation({
    selectedIndex,
    duration: 0.75,
  });
  const hasActive = selectedIndex > -1;
  return (
    <S.SectorTabList>
      {ARTICLE_SECTOR_ENTRY.map(([key, { label }], idx) => (
        <S.SectorTabItem
          tabIndex={0}
          key={key}
          selected={key === rawSelectedParams}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelect(key);
            }
          }}
          onClick={() => onSelect(key)}
          ref={(el) => setTabElementsRef(el, idx)}
        >
          {label}
        </S.SectorTabItem>
      ))}
      {hasActive && (
        <S.Underline
          translateX={selectedStyle.translateX}
          width={selectedStyle.width}
          duration={selectedStyle.duration}
        />
      )}
    </S.SectorTabList>
  );
}

export default SectorTab;
