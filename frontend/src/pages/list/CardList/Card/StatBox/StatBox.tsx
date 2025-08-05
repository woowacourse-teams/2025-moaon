import type { ReactElement } from "react";
import * as S from "./StatBox.styled";

interface StatBoxProps {
  icon: ReactElement;
  count: number;
}

function StatBox({ icon, count }: StatBoxProps) {
  return (
    <S.ActivityBox>
      {icon}
      {count > 999 ? "999+" : count}
    </S.ActivityBox>
  );
}

export default StatBox;
