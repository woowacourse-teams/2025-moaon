import useSearchParams from "@shared/hooks/useSearchParams";
import type { PropsWithChildren } from "react";
import type { FilterParam } from "../../FilterContainer";
import * as S from "./FilterBox.styled";

interface FilterBoxProps {
  param: FilterParam;
}

function FilterBox({ children, param }: PropsWithChildren<FilterBoxProps>) {
  const params = useSearchParams({ key: param, mode: "multi" });

  const handelFilterResetButtonClick = () => {
    params.deleteAll();
  };

  return (
    <S.Container>
      <S.Wrap>{children}</S.Wrap>
      <S.FilterResetButton type="button" onClick={handelFilterResetButtonClick}>
        초기화
      </S.FilterResetButton>
    </S.Container>
  );
}

export default FilterBox;
