import { 백엔드코치, 프론트엔드코치 } from "./data";
import * as S from "./Event2.styled";
import FlipCard from "./FlipCard/FlipCard";

const COACH = [
  {
    subTitle: "프론트엔드 코치 - 시지프",
    data: 프론트엔드코치,
    position: "fe",
  },
  {
    subTitle: "백엔드 코치 - 검프",
    data: 백엔드코치,
    position: "be",
  },
];

function Event2() {
  return (
    <S.Container>
      <S.Title>
        우아한테크코스 크루 출신 코치들이 <br /> 참여한 프로젝트를 살펴보세요
      </S.Title>
      <S.Wrap>
        {COACH.map(({ subTitle, data, position }) => (
          <S.Box key={subTitle}>
            <S.SubTitle>{subTitle}</S.SubTitle>
            <FlipCard data={data} position={position as "fe" | "be"} />
            <S.infoText>
              카드에 마우스를 올리면 상세 정보를 볼 수 있어요.
            </S.infoText>
          </S.Box>
        ))}
      </S.Wrap>
    </S.Container>
  );
}

export default Event2;
