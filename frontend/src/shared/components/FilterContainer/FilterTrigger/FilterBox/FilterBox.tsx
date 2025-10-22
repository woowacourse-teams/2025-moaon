import useSearchParams from "@shared/hooks/useSearchParams";
import type { PropsWithChildren } from "react";
import * as S from "./FilterBox.styled";

interface FilterBoxProps {
  param: string;
  onSelect: () => void;
  isOpen: boolean;
}

function FilterBox({
  children,
  param,
  onSelect,
  isOpen,
}: PropsWithChildren<FilterBoxProps>) {
  const params = useSearchParams({ key: param, mode: "multi" });

  const handelFilterResetButtonClick = () => {
    params.deleteAll({ replace: true });
    onSelect();
  };

  const disabledReset = params.get().length === 0;
  return (
    <S.Container isOpen={isOpen} param={param}>
      {children}
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
