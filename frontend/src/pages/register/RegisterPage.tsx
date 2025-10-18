import ArticleSubmission from "@domains/components/ArticleSubmission/ArticleSubmission";
import { useState } from "react";
import ProgressStepper from "./ProgressStepper/ProgessStepper";
import ProjectInfoForm from "./ProjectInfoForm/ProjectInfoForm";
import * as S from "./RegisterPage.styled";

function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectId, setProjectId] = useState<number | null>(null);

  const handleNextStepClick = (id: number) => {
    setProjectId(id);
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <S.RegisterPageContainer>
      <S.TitleSection>
        <S.Title>{currentStep === 1 ? "프로젝트" : "아티클"} 등록</S.Title>
        <S.Description>
          {currentStep === 1
            ? "프로젝트를 소개할 수 있도록 필요한 정보를 입력해주세요"
            : "아티클을 등록해서 여러분의 경험을 공유해주세요."}
        </S.Description>
      </S.TitleSection>

      <ProgressStepper
        steps={["프로젝트 등록", "아티클 등록"]}
        currentStep={currentStep}
      />

      <S.FormBox>
        {currentStep === 1 && <ProjectInfoForm onNext={handleNextStepClick} />}
        {currentStep === 2 && projectId !== null && (
          <ArticleSubmission projectId={projectId} />
        )}
      </S.FormBox>
    </S.RegisterPageContainer>
  );
}

export default RegisterPage;
