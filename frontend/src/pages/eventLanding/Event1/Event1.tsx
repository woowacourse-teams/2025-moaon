import { COMPANY_LIST } from "@/pages/wooteco/constants/company";
import * as S from "./Event1.styled";

const COMPANY_TEXT = [
  { text: "네", color: "#03CF5D" },
  { text: "카", color: "#FFCD00" },
  { text: "라", color: "#07C654" },
  { text: "배", color: "#3EB1B8" },
  { text: "당", color: "#FF6F0F" },
  { text: "토", color: "#0064FF" },
];

function Event1() {
  return (
    <>
      <S.Title>
        우아한테크코스 출신 <br />{" "}
        {COMPANY_TEXT.map(({ text, color }) => (
          <S.CompanyText key={text} color={color}>
            {text}
          </S.CompanyText>
        ))}{" "}
        개발자 프로젝트 보러가기
      </S.Title>

      <S.Grid>
        {COMPANY_LIST.map((company) => (
          <S.CompanyListItem key={company}>
            <S.CompanyLogo
              src={`https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/${company}-logo.svg`}
              alt=""
            />
          </S.CompanyListItem>
        ))}
      </S.Grid>
      <S.ButtonBox>
        <S.LinkButton to="/wooteco">프로젝트 보러가기</S.LinkButton>
      </S.ButtonBox>
    </>
  );
}

export default Event1;
