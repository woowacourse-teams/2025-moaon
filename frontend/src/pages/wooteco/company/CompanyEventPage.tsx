import EmptyState from "@shared/components/EmptyState/EmptyState";
import FilterContainer from "@shared/components/FilterContainer/FilterContainer";
import VisuallyHidden from "@shared/components/VisuallyHidden/VisuallyHidden";
import { useState } from "react";
import { COMPANY_NAME, type Company } from "../constants/company";
import { EVENT_PROJECT_DATA } from "../constants/data";
import * as S from "./CompanyEventPage.styled.ts";
import CompanyLoading from "./CompanyLoading/CompanyLoading";
import EventProjectList from "./EventProjectList/EventProjectList";
import { useCompanyEventProject } from "./hooks/useCompanyEventProject";
import useValidateCompanyPageParams from "./hooks/useValidateLocationState";
import OrdinalFilterBox from "./OrdinalFilterBox/OrdinalFilterBox";

function CompanyEventPage() {
  const { isValidating, company } = useValidateCompanyPageParams();
  const [isLoading, setIsLoading] = useState(true);
  const projects = useCompanyEventProject(
    EVENT_PROJECT_DATA[company as Company],
  );

  if (isValidating) {
    return null;
  }

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <CompanyLoading
        company={company}
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <S.Main>
      <VisuallyHidden>
        <h1>{company} 합격한 프로젝트 모아보기</h1>
      </VisuallyHidden>
      <S.Image
        src={`${process.env.S3_BASE_URL}/wooteco-event/${company}-text.svg`}
        alt=""
      />
      <S.ContentSection>
        <S.FilterContainerWrapper>
          <FilterContainer
            filterList={[
              {
                label: "우테코 기수",
                param: "ordinals",
                render: (onSelect: () => void) => (
                  <OrdinalFilterBox onSelect={onSelect} />
                ),
              },
            ]}
            onSelect={() => {}}
          />
          {projects.length > 0 && (
            <S.ProjectCountText>
              {projects.length}개의 프로젝트가 있어요
            </S.ProjectCountText>
          )}
        </S.FilterContainerWrapper>
        {projects.length <= 0 ? (
          <EmptyState
            title={`선택한 기수에 ${COMPANY_NAME[company]} 개발자가 참여한 프로젝트가 존재하지 않습니다.`}
            description=""
          />
        ) : (
          <EventProjectList projects={projects} />
        )}
      </S.ContentSection>
    </S.Main>
  );
}

export default CompanyEventPage;
