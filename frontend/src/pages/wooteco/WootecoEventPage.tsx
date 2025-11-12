import VisuallyHidden from "@shared/components/VisuallyHidden/VisuallyHidden";
import CompanySection from "./CompanySection/CompanySection";
import { COMPANY_LIST } from "./constants/company";
import * as S from "./WootecoEventPage.styled";

function WootecoEventPage() {
  return (
    <S.MainContainer>
      123
      {/* <VisuallyHidden>
        <h1>네카라당토배 개발자가 참여한 프로젝트 모아보기</h1>
      </VisuallyHidden>
      {COMPANY_LIST.map((company) => (
        <CompanySection key={company} company={company} />
      ))} */}
    </S.MainContainer>
  );
}

export default WootecoEventPage;
