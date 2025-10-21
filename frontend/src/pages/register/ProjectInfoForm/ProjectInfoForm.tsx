import InputFormField from "@domains/components/ArticleSubmission/ArticleForm/components/InputFormField/InputFormField";
import MarkdownFormField from "./components/MarkdownFormField/MarkdownFormField";
import ProjectCategoryFormField from "./components/ProjectCategoryFormField/ProjectCategoryFormField";
import TechStackFormField from "./components/TechStackFormField/TechStackFormField";
import { useProjectInfoForm } from "./hooks/useProjectInfoForm";
import * as S from "./ProjectInfoForm.styled";

interface ProjectInfoFormProps {
  onNext: (projectId: number) => void;
}
function ProjectInfoForm({ onNext }: ProjectInfoFormProps) {
  const {
    formData,
    errors,
    isFormValid,
    updateFormField,
    handleTechStackChange,
    toggleCategory,
    handleNextClick,
  } = useProjectInfoForm({ onNext });

  return (
    <S.ProjectInfoForm>
      <InputFormField
        title="프로젝트 제목"
        name="title"
        placeholder="프로젝트 이름을 입력하세요"
        value={formData.title}
        onChange={(e) => updateFormField("title", e.target.value)}
        errorMessage={errors.title}
      />

      <InputFormField
        title="한 줄 소개"
        name="summary"
        placeholder="프로젝트를 한 문장으로 소개해주세요"
        value={formData.summary}
        onChange={(e) => updateFormField("summary", e.target.value)}
        errorMessage={errors.summary}
      />

      <MarkdownFormField
        title="프로젝트 개요"
        name="description"
        value={formData.description}
        onChange={(value) => updateFormField("description", value)}
        minLength={100}
        maxLength={8000}
        errorMessage={errors.description}
      />

      <TechStackFormField
        title="기술 스택"
        name="techStacks"
        selectedTechStacks={formData.techStacks}
        onTechStackChange={handleTechStackChange}
        errorMessage={errors.techStacks}
      />

      <ProjectCategoryFormField
        title="주제"
        name="categories"
        selectedCategories={formData.categories}
        onCategoryChange={toggleCategory}
        errorMessage={errors.categories}
      />

      <InputFormField
        title="GitHub 주소"
        name="githubUrl"
        placeholder="https://github.com/username/repository"
        value={formData.githubUrl}
        onChange={(e) => updateFormField("githubUrl", e.target.value)}
        required={false}
        errorMessage={errors.githubUrl}
      />

      <InputFormField
        title="서비스 주소"
        name="productionUrl"
        placeholder="https://your-service.com"
        value={formData.productionUrl}
        onChange={(e) => updateFormField("productionUrl", e.target.value)}
        required={false}
        errorMessage={errors.productionUrl}
      />

      <S.NextButton
        type="button"
        onClick={handleNextClick}
        disabled={!isFormValid}
      >
        다음
      </S.NextButton>
    </S.ProjectInfoForm>
  );
}

export default ProjectInfoForm;
