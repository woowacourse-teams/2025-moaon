import InputFormField from "@domains/components/ArticleSubmission/ArticleForm/components/InputFormField/InputFormField";
import type { ProjectCategoryKey } from "@domains/filter/projectCategory";
import type { TechStackKey } from "@domains/filter/techStack";
import { toast } from "@shared/components/Toast/toast";
import { useState } from "react";
import type { ProjectFormDataType } from "../types";
import MarkdownFormField from "./components/MarkdownFormField/MarkdownFormField";
import ProjectCategoryFormField from "./components/ProjectCategoryFormField/ProjectCategoryFormField";
import TechStackFormField from "./components/TechStackFormField/TechStackFormField";
import * as S from "./ProjectInfoForm.styled";
import { validateProjectInfoFormData } from "./utils/ProjectInfoFormUtils";

interface ProjectInfoFormProps {
  onNext: () => void;
}

function ProjectInfoForm({ onNext }: ProjectInfoFormProps) {
  const [formData, setFormData] = useState<ProjectFormDataType>({
    title: "",
    summary: "",
    githubUrl: "",
    productionUrl: "",
    description: "",
    categories: [],
    techStacks: [],
  });

  const handleNextClick = () => {
    const errorMessage = validateProjectInfoFormData(formData);

    if (errorMessage) {
      toast.warning(errorMessage);
      return;
    }

    onNext();
  };

  const handleTechStackChange = (techStack: TechStackKey) => {
    setFormData((prev) => {
      const isSelected = prev.techStacks.includes(techStack);
      return {
        ...prev,
        techStacks: isSelected
          ? prev.techStacks.filter((t) => t !== techStack)
          : [...prev.techStacks, techStack],
      };
    });
  };

  const toggleTopic = (key: ProjectCategoryKey) => {
    setFormData((prev) => {
      const isSelected = prev.categories.includes(key);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter((t) => t !== key)
          : [...prev.categories, key],
      };
    });
  };

  return (
    <S.ProjectInfoForm>
      <InputFormField
        title="프로젝트 제목"
        name="title"
        placeholder="프로젝트 이름을 입력하세요"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
      />

      <InputFormField
        title="한 줄 소개"
        name="summary"
        placeholder="프로젝트를 한 문장으로 소개해주세요"
        value={formData.summary}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            summary: e.target.value,
          }))
        }
      />

      <MarkdownFormField
        title="프로젝트 개요"
        name="description"
        value={formData.description}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, description: value }))
        }
      />

      <TechStackFormField
        title="기술 스택"
        name="techStacks"
        selectedTechStacks={formData.techStacks}
        onTechStackChange={handleTechStackChange}
      />

      <ProjectCategoryFormField
        title="주제"
        name="categories"
        selectedCategories={formData.categories}
        onCategoryChange={toggleTopic}
      />

      <InputFormField
        title="GitHub 주소"
        name="githubUrl"
        placeholder="https://github.com/username/repository"
        value={formData.githubUrl}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))
        }
        required={false}
      />

      <InputFormField
        title="서비스 주소"
        name="productionUrl"
        placeholder="https://your-service.com"
        value={formData.productionUrl}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            productionUrl: e.target.value,
          }))
        }
        required={false}
      />

      <S.NextButton type="button" onClick={handleNextClick}>
        다음
      </S.NextButton>
    </S.ProjectInfoForm>
  );
}

export default ProjectInfoForm;
