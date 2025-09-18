import { useLocation, useNavigate } from "react-router";

export const useUpdateSectorParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (newSector: string) => {
    const params = new URLSearchParams(location.search);

    params.set("sector", newSector);
    params.delete("topics");
    params.delete("techStacks");

    navigate({ search: params.toString() }, { replace: true });
  };
};
