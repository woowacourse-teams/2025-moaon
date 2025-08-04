import TechStackList from "@/pages/list/CardList/Card/TechStackList/TechStackList";
import Badge from "./Badge/Badge";
import * as S from "./Card.styled";

function Card() {
  return (
    <S.CardContainer>
      <Badge text={"트러블 슈팅"} />
      <S.CardTitle>
        TurboRepo Just-in-Time Packages 적용기 Feat. ModuleResolution
      </S.CardTitle>
      <S.CardSummary>
        방법을 소개합니다. 메모리 누수 방지와 사용자 경험 개선 팁도 함께
        다룹니다. Intersection Observer API를 활용하여 성능 최적화된 무한
        스크롤을 구현하는 방법을 소개합니다. 메모리 누수 방지와 사용자 경험 개선
        팁도 함께 다룹니다.
      </S.CardSummary>
      <TechStackList techStacks={["java", "react"]} />
    </S.CardContainer>
  );
}

export default Card;
