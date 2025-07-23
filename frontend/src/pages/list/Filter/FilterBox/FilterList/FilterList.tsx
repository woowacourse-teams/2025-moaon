import useSearchParams from "@/shared/hooks/useSearchParams";
import * as S from "./FilterList.styled";

function FilterList() {
  const techStack = useSearchParams({
    key: "techStack",
    mode: "multi",
  });

  return <S.List></S.List>;
}

export default FilterList;
