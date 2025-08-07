import useSearchParams from "@shared/hooks/useSearchParams";
import type { PropsWithChildren } from "react";
import useProjectList from "@/pages/project-list/hooks/useProjectList";
import type { FilterParam } from "../../FilterContainer";
import * as S from "./FilterBox.styled";

interface FilterBoxProps {
  param: FilterParam;
}

function FilterBox({ children, param }: PropsWithChildren<FilterBoxProps>) {
  const params = useSearchParams({ key: param, mode: "multi" });
  const { refetch } = useProjectList();

  const handelFilterResetButtonClick = () => {
    params.deleteAll({ replace: true });
    refetch();
  };

  const disabledReset = params.get().length === 0;
  return (
    <S.Container>
      <S.Wrap>{children}</S.Wrap>
      <S.FilterResetButton
        type="button"
        onClick={handelFilterResetButtonClick}
        disabled={disabledReset}
      >
        초기화
      </S.FilterResetButton>
    </S.Container>
  );
}

export default FilterBox;
