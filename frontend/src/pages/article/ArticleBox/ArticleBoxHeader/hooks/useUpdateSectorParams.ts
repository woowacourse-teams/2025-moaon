import type { ArticleSectorKey } from "@domains/filter/articleSector";
import { useLocation, useNavigate } from "react-router";

export const useUpdateSectorParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (newSector: ArticleSectorKey) => {
    const params = new URLSearchParams();
    params.set("sector", newSector);

    const prevParams = new URLSearchParams(location.search);
    const searchValue = prevParams.get("search");
    if (searchValue) {
      params.set("search", searchValue);
    }

    navigate({ search: params.toString() }, { replace: true });
  };
};
