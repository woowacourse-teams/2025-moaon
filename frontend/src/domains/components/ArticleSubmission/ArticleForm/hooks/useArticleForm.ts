import { toast } from "@shared/components/Toast/toast";
import { useCallback, useEffect, useState } from "react";
import type { ArticleFormDataType, SectorType } from "../../types";
import { createEmptyFormData, validateFormData } from "../utils/formUtils";
import { useFetchMeta } from "./useFetchMeta";

interface UseArticleFormProps {
  editingData?: ArticleFormDataType;
  onSubmit: (data: ArticleFormDataType) => void;
  onUpdate: (data: ArticleFormDataType) => void;
  onCancel: () => void;
}

export const useArticleForm = ({
  editingData,
  onSubmit,
  onUpdate,
  onCancel,
}: UseArticleFormProps) => {
  const { fill } = useFetchMeta();

  const [formData, setFormData] = useState<ArticleFormDataType>(() =>
    createEmptyFormData()
  );

  useEffect(() => {
    if (!editingData) {
      return;
    }

    setFormData(editingData);
  }, [editingData]);

  const handleFetchMeta = async () => {
    const result = await fill({
      urlInput: formData.address,
    });
    if (result) {
      const { title, description } = result;
      setFormData((prev) => ({
        ...prev,
        title: title,
        description: description,
      }));
    }
  };

  const updateFormFieldData = <K extends keyof ArticleFormDataType>(
    field: K,
    value: ArticleFormDataType[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = <
    K extends keyof ArticleFormDataType,
    T extends keyof NonNullable<ArticleFormDataType[K]>
  >(
    field: K,
    subField: T,
    subValue: NonNullable<ArticleFormDataType[K]>[T]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...(prev[field] as SectorType),
        [subField]: subValue,
      },
    }));
  };

  const handleSubmit = useCallback(() => {
    const errorMessage = validateFormData(formData);
    if (errorMessage !== "") {
      toast.warning(errorMessage);
      return;
    }

    if (onUpdate && editingData) {
      onUpdate(formData);
    } else {
      onSubmit(formData);
    }

    setFormData(createEmptyFormData());
  }, [formData, onSubmit, onUpdate, editingData]);

  const handleCancel = useCallback(() => {
    onCancel();
    setFormData(createEmptyFormData());
  }, [onCancel]);

  return {
    formData,
    updateFormFieldData,
    updateNestedField,
    handleFetchMeta,
    handleSubmit,
    handleCancel,
  };
};
