import SectionTitle from "../SectionTitle";
import * as S from "./OverviewSection.styled";

interface OverviewSectionProps {
  overview: string;
}

function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <S.OverviewSectionContainer>
      <SectionTitle text="프로젝트 개요" />
      <S.OverviewContent>
        {overview}
        1. 프로젝트명
        <br />
        우리가 만들고자 하는 서비스의 이름과 한 줄 설명. 프로젝트의 정체성과
        방향성을 담습니다.
        <br />
        <br />
        2. 비전과 목적
        <br />
        이 프로젝트는 어떤 문제에서 출발했으며, 궁극적으로 무엇을 해결하려
        하는가에 대한 명확한 선언입니다.
        <br />
        <br />
        3. 문제 정의
        <br />
        사용자 또는 시장이 겪는 불편함과 구조적 비효율을 구체적으로 설명합니다.
        <br />
        해결되지 않을 경우 지속될 리스크도 함께 정리합니다.
        <br />
        <br />
        4. 솔루션
        <br />
        프로젝트가 제안하는 핵심 해결책. 기능이 아닌 ‘어떻게 다르게
        해결하는가’에 집중해 표현합니다.
      </S.OverviewContent>
    </S.OverviewSectionContainer>
  );
}

export default OverviewSection;
