import type { PropsWithChildren } from "react";
import * as S from "./FilterBox.styled";

function FilterBox({ children }: PropsWithChildren) {
  return (
    <S.Container>
      <S.Wrap>{children}</S.Wrap>
      <S.FilterResetButton type="button">초기화</S.FilterResetButton>
    </S.Container>
  );
}

export default FilterBox;
