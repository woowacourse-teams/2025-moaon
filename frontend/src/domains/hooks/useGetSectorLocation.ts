import type { ArticleSectorKey } from "@domains/filter/articleSector";
import { useLocation } from "react-router";

const DEFAULT_SECTOR = "all";

export const useGetSectorLocation = (): ArticleSectorKey => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sector = params.get("sector") as ArticleSectorKey;

  return sector ?? DEFAULT_SECTOR;
};
