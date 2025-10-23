import type { ProjectCategoryKey } from "@domains/filter/projectCategory";
import type { TechStackKey } from "@domains/filter/techStack";
import { toast } from "@shared/components/Toast/toast";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { projectRegisterQueries } from "@/apis/projectRegister/projectRegister.queries";
import type { ProjectFormData } from "../../../../apis/projectRegister/postProjectRegister.type";
import {
  type ProjectInfoFormErrors,
  validateField,
  validateProjectInfoFormData,
} from "../utils/ProjectInfoFormUtils";

const isEmptyValue = <K extends keyof ProjectFormData>(
  _field: K,
  value: ProjectFormData[K]
) => {
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "string") return value.trim().length === 0;
  return value === undefined || value === null;
};

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
  const [errors, setErrors] = useState<ProjectInfoFormErrors>({});

  const { mutateAsync: requestImages } = useMutation(
    projectRegisterQueries.getPresignedUrl()
  );

  const { mutate: submitProject } = useMutation(
    projectRegisterQueries.postProject()
  );

  const { mutateAsync: uploadProjectImage } = useMutation(
    projectRegisterQueries.uploadProjectImage()
  );

  const isFormValid = useMemo(() => {
    const validationErrors = validateProjectInfoFormData(formData);
    return Object.values(validationErrors).every((error) => !error);
  }, [formData]);

  const handleImageRegister = async (files: File[]) => {
    const fileNames = files.map((file) => file.name);
    const response = await requestImages(fileNames);
    const keys = await uploadProjectImage({ response, files });
    const newFormData = {
      ...formData,
      imageKeys: [...(formData.imageKeys ?? []), ...keys],
    };

    setFormData(newFormData);

    return newFormData;
  };

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

  const updateFormField = useCallback(
    <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => {
      setFormData((prev) => {
        const next = { ...prev, [field]: value };

        if (isEmptyValue(field, value)) {
          setErrors((prevErr) => ({ ...prevErr, [field]: undefined }));
          return next;
        }

        const msg = validateField(field, value);
        setErrors((prevErr) => ({ ...prevErr, [field]: msg || undefined }));
        return next;
      });
    },
    []
  );

  const handleTechStackChange = useCallback((techStack: TechStackKey) => {
    setFormData((prev) => {
      const isSelected = prev.techStacks.includes(techStack);
      const nextTechStacks = isSelected
        ? prev.techStacks.filter((t) => t !== techStack)
        : [...prev.techStacks, techStack];

      const next = { ...prev, techStacks: nextTechStacks };

      if (nextTechStacks.length === 0) {
        setErrors((prevErr) => ({ ...prevErr, techStacks: undefined }));
        return next;
      }

      const msg = validateField("techStacks", nextTechStacks);
      setErrors((prevErr) => ({ ...prevErr, techStacks: msg || undefined }));
      return next;
    });
  }, []);

  const toggleCategory = useCallback((key: ProjectCategoryKey) => {
    setFormData((prev) => {
      const isSelected = prev.categories.includes(key);
      const nextCategories = isSelected
        ? prev.categories.filter((t) => t !== key)
        : [...prev.categories, key];

      const next = { ...prev, categories: nextCategories };

      if (nextCategories.length === 0) {
        setErrors((prevErr) => ({ ...prevErr, categories: undefined }));
        return next;
      }

      const msg = validateField("categories", nextCategories);
      setErrors((prevErr) => ({ ...prevErr, categories: msg || undefined }));
      return next;
    });
  }, []);

  const onNextClick = async (files: File[]) => {
    const nextErrors = validateProjectInfoFormData(formData);
    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some((m) => m && m.length > 0);
    if (hasError) {
      return;
    }

    try {
      if (files.length > 0) {
        const newFormData = await handleImageRegister(files);
        if (newFormData) {
          handleNextClick(newFormData);
        }
        return;
      }

      handleNextClick(formData);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      toast.error("프로젝트 등록에 실패했습니다.");
    }
  };

  return {
    formData,
    errors,
    isFormValid,
    setFormData,
    updateFormField,
    handleTechStackChange,
    toggleCategory,
    onNextClick,
  };
};
