import type { ProjectCategoryKey } from "@domains/filter/projectCategory";
import type { TechStackKey } from "@domains/filter/techStack";
import { toast } from "@shared/components/Toast/toast";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { projectRegisterQueries } from "@/apis/projectRegister/projectRegister.queries";
import type { ProjectFormData } from "../../../../apis/projectRegister/postProjectRegister.type";
import { validateProjectInfoFormData } from "../utils/ProjectInfoFormUtils";

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

  const { mutate, isPending } = useMutation(
    projectRegisterQueries.postProject()
  );

  const handleNextClick = () => {
    const errorMessage = validateProjectInfoFormData(formData);

    if (errorMessage) {
      toast.warning(errorMessage);
      return;
    }

    mutate(formData, {
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
    updateFormField,
    handleTechStackChange,
    toggleCategory,
    handleNextClick,
    isPending,
  };
};
