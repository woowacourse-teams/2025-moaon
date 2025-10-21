import type { ProjectCategoryKey } from "@domains/filter/projectCategory";
import type { TechStackKey } from "@domains/filter/techStack";
import { toast } from "@shared/components/Toast/toast";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { projectRegisterQueries } from "@/apis/projectRegister/projectRegister.queries";
import type { ProjectFormData } from "../../../../apis/projectRegister/postProjectRegister.type";

interface UseProjectInfoFormProps {
  onNext: (projectId: number) => void;
}

export const useProjectInfoForm = ({ onNext }: UseProjectInfoFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    summary: "",
    githubUrl: "",
    imageKeys: [],
    productionUrl: "",
    description: "",
    categories: [],
    techStacks: [],
  });

  const { mutateAsync: requestImages } = useMutation(
    projectRegisterQueries.postProjectImage()
  );

  const handleImageRegisterClick = async (files: File[]) => {
    try {
      const fileNames = files.map((file) => file.name);
      const response = await requestImages(fileNames);

      const keys = await Promise.all(
        response.map(async ({ preSignedUrl, key }, index) => {
          const file = files[index];
          const res = await fetch(preSignedUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type || "application/octet-stream",
            },
            body: file,
          });

          if (!res.ok) {
            const body = await res.text();
            throw new Error(
              `파일 업로드에 실패했습니다: ${file.name} - ${body}`
            );
          }

          return `https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/${key}`;
        })
      );

      const newFormData = {
        ...formData,
        imageKeys: [...(formData.imageKeys ?? []), ...keys],
      };

      setFormData(newFormData);

      return newFormData;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      toast.error("이미지 등록에 실패했습니다.");
    }
  };

  const { mutateAsync: submitProject } = useMutation(
    projectRegisterQueries.postProject()
  );

  const handleNextClick = (formData: ProjectFormData) => {
    submitProject(formData, {
      onSuccess: (projectFormData) => {
        onNext(projectFormData.id);
      },
      onError: (err) => {
        toast.error(err.message || "프로젝트 등록에 실패했습니다.");
      },
    });
  };

  const handleTechStackChange = useCallback((techStack: TechStackKey) => {
    setFormData((prev) => {
      const isSelected = prev.techStacks.includes(techStack);
      return {
        ...prev,
        techStacks: isSelected
          ? prev.techStacks.filter((t) => t !== techStack)
          : [...prev.techStacks, techStack],
      };
    });
  }, []);

  const toggleCategory = useCallback((key: ProjectCategoryKey) => {
    setFormData((prev) => {
      const isSelected = prev.categories.includes(key);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter((t) => t !== key)
          : [...prev.categories, key],
      };
    });
  }, []);

  const updateFormField = useCallback(
    <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  return {
    formData,
    setFormData,
    updateFormField,
    handleTechStackChange,
    handleImageRegisterClick,
    toggleCategory,
    handleNextClick,
  };
};
