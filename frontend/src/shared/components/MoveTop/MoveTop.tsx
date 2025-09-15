import { useEffect, useState } from "react";
import ArrowUp from "@/assets/icons/top-arrow.svg";
import useScrollPosition from "@/shared/hooks/useScrollPosition";
import * as S from "./MoveTop.styled";

function MoveTop() {
  const isScrolled = useScrollPosition(300);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isScrolled) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 100); // 약간의 지연으로 애니메이션 트리거
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300); // 애니메이션 완료 후 DOM에서 제거
    }
  }, [isScrolled]);

  if (!shouldRender) {
    return null;
  }

  return (
    <S.MoveTopButton
      isVisible={isVisible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
    >
      <S.MoveTopIcon src={ArrowUp} alt="상단으로 이동" />
    </S.MoveTopButton>
  );
}

export default MoveTop;
