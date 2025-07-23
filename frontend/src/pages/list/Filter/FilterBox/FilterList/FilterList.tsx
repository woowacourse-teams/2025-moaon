import useSearchParams from "@/shared/hooks/useSearchParams";
import * as S from "./FilterList.styled";

function FilterList() {
  const techStack = useSearchParams({
    key: "techStack",
    mode: "multi",
  });

  return (
    <S.List>
      {/* <FilterItem onClick={() => techStack.update("1")} />
      <FilterItem onClick={() => techStack.update("2")} />
      <FilterItem onClick={() => techStack.update("3")} />
      <FilterItem onClick={() => techStack.update("4")} />
      <FilterItem onClick={() => techStack.update("5")} /> */}
    </S.List>
  );
}

export default FilterList;
