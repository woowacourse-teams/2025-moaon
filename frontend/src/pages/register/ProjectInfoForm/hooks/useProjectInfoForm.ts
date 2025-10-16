import type { ProjectCategoryKey } from "@domains/filter/projectCategory";
import type { TechStackKey } from "@domains/filter/techStack";
import { toast } from "@shared/components/Toast/toast";
import { useCallback, useState } from "react";
import type { ProjectFormData } from "../../../../apis/projectRegister/postProjectRegister.type";
import { validateProjectInfoFormData } from "../utils/ProjectInfoFormUtils";

interface UseProjectInfoFormProps {
  onNext: () => void;
}

export const useProjectInfoForm = ({ onNext }: UseProjectInfoFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    summary: "",
    githubUrl: "",
    productionUrl: "",
    description: "",
    categories: [],
    techStacks: [],
  });

  const handleNextClick = useCallback(() => {
    const errorMessage = validateProjectInfoFormData(formData);

    if (errorMessage) {
      toast.warning(errorMessage);
      return;
    }

    onNext();
  }, [formData, onNext]);

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
  };
};
