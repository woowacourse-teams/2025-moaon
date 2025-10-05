import CompanySection from "./CompanySection/CompanySection";
import { COMPANY_LIST } from "./constants/company";
import * as S from "./WootecoEventPage.styled";

function WootecoEventPage() {
  return (
    <S.MainContainer>
      {COMPANY_LIST.map((company) => (
        <CompanySection key={company} company={company} />
      ))}
    </S.MainContainer>
  );
}

export default WootecoEventPage;
