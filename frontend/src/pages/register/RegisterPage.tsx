import { useState } from "react";
import ProgressStepper from "./ProgressStepper/ProgessStepper";
import ProjectInfoForm from "./ProjectInfoForm/ProjectInfoForm";
import * as S from "./RegisterPage.styled";

function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStepClick = () => setCurrentStep((prev) => prev + 1);

  return (
    <>
      <S.TitleSection>
        <S.Title>프로젝트 등록</S.Title>
        <S.Description>
          프로젝트를 소개할 수 있도록 필요한 정보를 입력해주세요
        </S.Description>
      </S.TitleSection>

      <ProgressStepper
        steps={["프로젝트 등록", "아티클 등록"]}
        currentStep={currentStep}
      />

      <S.FormBox>
        {currentStep === 1 && <ProjectInfoForm onNext={handleNextStepClick} />}
      </S.FormBox>
    </>
  );
}

export default RegisterPage;
