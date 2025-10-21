import ArticleSubmission from "@domains/components/ArticleSubmission/ArticleSubmission";
import Modal from "@shared/components/Modal/Modal";
import { useOverlay } from "@shared/hooks/useOverlay";
import { useState } from "react";
import { useNavigate } from "react-router";
import ProjectInfoForm from "./ProjectInfoForm/ProjectInfoForm";
import * as S from "./RegisterPage.styled";

function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectId, setProjectId] = useState<number | null>(null);
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useOverlay();

  const navigate = useNavigate();

  const handleNextStepClick = (id: number) => {
    setProjectId(id);
    openModal();
  };

  return (
    <S.RegisterPageContainer>
      <S.TitleSection>
        <S.Title>{currentStep === 1 ? "프로젝트" : "아티클"} 등록</S.Title>
        <S.Description>
          {currentStep === 1
            ? "프로젝트 등록에 필요한 정보를 입력해주세요"
            : "프로젝트와 관련된 아티클을 등록해주세요"}
        </S.Description>
      </S.TitleSection>

      <S.FormBox>
        {currentStep === 1 && <ProjectInfoForm onNext={handleNextStepClick} />}
        {currentStep === 2 && projectId !== null && (
          <ArticleSubmission projectId={projectId} />
        )}
      </S.FormBox>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="프로젝트 등록 완료"
          onClose={closeModal}
          showCloseButton={true}
        >
          <S.ButtonContainer>
            <S.ArticleAddButton
              onClick={() => {
                closeModal();
                setCurrentStep((prev) => prev + 1);
              }}
            >
              프로젝트 아티클 등록하기
            </S.ArticleAddButton>
            <S.ProjectNavigateButton
              onClick={() => {
                closeModal();
                navigate(`/project/${projectId}`);
              }}
            >
              등록된 프로젝트 보러가기
            </S.ProjectNavigateButton>
          </S.ButtonContainer>
        </Modal>
      )}
    </S.RegisterPageContainer>
  );
}

export default RegisterPage;
