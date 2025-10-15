import {
  PROJECT_CATEGORY_ENTRY,
  type ProjectCategoryKey,
} from "@domains/filter/projectCategory";
import FormField from "@shared/components/FormField/FormField";
import TagList from "@shared/components/TagList/TagList";
import { useState } from "react";
import ProgressStepper from "./ProgressStepper/ProgessStepper";
import ProjectOverviewEditor from "./ProjectOverviewEditor/ProjectOverviewEditor";
import * as S from "./RegisterPage.styled";
import type { ProjectFormDataType } from "./types";

function RegisterPage() {
  const [formData, setFormData] = useState<ProjectFormDataType>({
    title: "",
    description: "",
    githubUrl: "",
    serviceUrl: "",
    overview: "",
    topics: [],
    techStacks: [],
  });

  console.log(formData);

  const toggleTopic = (key: ProjectCategoryKey) => {
    setFormData((prev) => {
      const isSelected = prev.topics.includes(key);
      return {
        ...prev,
        topics: isSelected
          ? prev.topics.filter((t) => t !== key)
          : [...prev.topics, key],
      };
    });
  };

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
        currentStep={1}
      />

      <S.FormBox>
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
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </FormField>

          <FormField title="프로젝트 개요">
            <ProjectOverviewEditor
              value={formData.overview}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, overview: value }))
              }
            />
          </FormField>

          <FormField title="주제">
            <TagList
              entries={PROJECT_CATEGORY_ENTRY}
              onSelect={toggleTopic}
              isActive={(key) => formData.topics.includes(key)}
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
              value={formData.serviceUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, serviceUrl: e.target.value }))
              }
            />
          </FormField>
        </S.FormFieldGroups>
      </S.FormBox>
    </>
  );
}

export default RegisterPage;
