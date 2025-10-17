import { 백엔드코치, 프론트엔드코치 } from "./data";
import * as S from "./Event2.styled";

const COACH = [
  {
    id: 1,
    subTitle: "프론트엔드 코치 - 시지프",
    data: 프론트엔드코치,
    color: "#FF7020",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/kkogkkog-logo.svg",
  },
  {
    id: 2,
    subTitle: "백엔드 코치 - 검프",
    data: 백엔드코치,
    color: "#469fab",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/cvi-logo.svg",
  },
];

function Event2() {
  return (
    <S.Container>
      <S.Title>
        우아한테크코스 코치들이 크루 시절에 <br />
        참여한 프로젝트를 살펴보세요
      </S.Title>
      <S.Wrap>
        {COACH.map(({ subTitle, data, color, imgUrl }) => (
          <S.Box key={subTitle}>
            <S.SubTitle color={color}>{subTitle}</S.SubTitle>
            <S.Image src={imgUrl} alt="" />
            <S.Link to={`project/${data.id}`} $backgroundColor={color}>
              {`${data.title} 프로젝트 보러가기`}
            </S.Link>
          </S.Box>
        ))}
      </S.Wrap>
    </S.Container>
  );
}

export default Event2;
