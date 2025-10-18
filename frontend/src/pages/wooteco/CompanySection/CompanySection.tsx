import { COMPANY_NAME, type Company } from "../constants/company";
import { EVENT_PROJECT_DATA } from "../constants/data";
import ProjectCarousel from "../ProjectCarousel/ProjectCarousel";
import * as S from "./CompanySection.styled";

interface CompanySectionProps {
  company: Company;
}

function CompanySection({ company }: CompanySectionProps) {
  return (
    <S.Section key={company}>
      <S.SubTitle>
        <S.CompanyImage
          src={`https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/${company}-logo.svg`}
          alt=""
        />
        {COMPANY_NAME[company]}에 합격한 프로젝트
      </S.SubTitle>
      <S.Box>
        <S.Description>
          이전/다음 버튼을 클릭하거나 스와이프하여 프로젝트를 살펴보세요.
        </S.Description>
        <S.MoreLink to={`/wooteco/${company}`}>한눈에 보기</S.MoreLink>
      </S.Box>
      <ProjectCarousel projects={EVENT_PROJECT_DATA[company]} />
    </S.Section>
  );
}

export default CompanySection;
