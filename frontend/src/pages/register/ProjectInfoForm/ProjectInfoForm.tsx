import TechStackSearchBar from "@domains/components/TechStackFilterBox/TechStackSearchBar/TechStackSearchBar";
import {
  PROJECT_CATEGORY_ENTRY,
  type ProjectCategoryKey,
} from "@domains/filter/projectCategory";
import {
  TECH_STACK_ICON_MAP,
  type TechStackKey,
} from "@domains/filter/techStack";
import FormField from "@shared/components/FormField/FormField";
import TagList from "@shared/components/TagList/TagList";
import { toast } from "@shared/components/Toast/toast";
import { useState } from "react";
import ProjectOverviewEditor from "../ProjectOverviewEditor/ProjectOverviewEditor";
import type { ProjectFormDataType } from "../types";
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
    <S.FormFieldGroups>
      <FormField title="프로젝트 제목">
        <input
          type="text"
          name="title"
          placeholder="프로젝트 이름을 입력하세요"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </FormField>

      <FormField title="한 줄 소개">
        <input
          type="text"
          name="description"
          placeholder="프로젝트를 한 문장으로 소개해주세요"
          value={formData.summary}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              summary: e.target.value,
            }))
          }
        />
      </FormField>

      <FormField title="프로젝트 개요">
        <ProjectOverviewEditor
          value={formData.description}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, description: value }))
          }
        />
      </FormField>

      <FormField title="기술 스택">
        <TechStackSearchBar
          mode="controlled"
          selectedTechStacks={formData.techStacks}
          onTechStackChange={handleTechStackChange}
        />

        {formData.techStacks.length > 0 && (
          <S.SelectedTechStacks>
            {formData.techStacks.map((techStack) => (
              <S.TechStackTag key={techStack}>
                {TECH_STACK_ICON_MAP[techStack].label}
                {/* TODO: CloseIconButton으로 교체 */}
                <button
                  type="button"
                  onClick={() => handleTechStackChange(techStack)}
                >
                  ×
                </button>
              </S.TechStackTag>
            ))}
          </S.SelectedTechStacks>
        )}
      </FormField>

      <FormField title="주제">
        <TagList
          entries={PROJECT_CATEGORY_ENTRY}
          onSelect={toggleTopic}
          isActive={(key) => formData.categories.includes(key)}
        />
      </FormField>

      <FormField title="GitHub 주소" required={false}>
        <input
          type="text"
          name="githubUrl"
          placeholder="https://github.com/username/repository"
          value={formData.githubUrl}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))
          }
        />
      </FormField>

      <FormField title="서비스 주소" required={false}>
        <input
          type="text"
          name="serviceUrl"
          placeholder="https://your-service.com"
          value={formData.productionUrl}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              productionUrl: e.target.value,
            }))
          }
        />
      </FormField>

      <S.NextButton type="button" onClick={handleNextClick}>
        다음
      </S.NextButton>
    </S.FormFieldGroups>
  );
}

export default ProjectInfoForm;
