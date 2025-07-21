import type { ReactElement } from "react";
import * as S from "./ActivityBox.styled";

interface ActivityBoxProps {
  icon: ReactElement;
  count: number;
}

function ActivityBox({ icon, count }: ActivityBoxProps) {
  return (
    <S.ActivityBox>
      {icon}
      {count > 999 ? "999+" : count}
    </S.ActivityBox>
  );
}

export default ActivityBox;
