import * as S from "./MoveTop.styled";
import ArrowIcon from "../ArrowIcon/ArrowIcon";

function MoveTop() {
  return (
    <S.MoveTopButton
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowIcon direction="down" />
      TOP
    </S.MoveTopButton>
  );
}

export default MoveTop;
