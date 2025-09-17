import type { ArticleSectorKey } from "@domains/filter/articleSector";
import useSearchParams from "@shared/hooks/useSearchParams";

export const useArticleSector = (defaultValue: ArticleSectorKey) => {
  const sectorParams = useSearchParams({
    key: "sector",
    mode: "single",
  });

  const rawSelectedSector = sectorParams.get()[0] as ArticleSectorKey;
  const selectedSector = rawSelectedSector ?? defaultValue;

  const updateSector = (key: ArticleSectorKey) => {
    sectorParams.update(key, { replace: true, reset: true });
  };

  return { selectedSector, updateSector };
};
