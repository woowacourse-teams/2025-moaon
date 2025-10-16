import { toast } from "@shared/components/Toast/toast";
import { useCallback, useEffect, useState } from "react";
import type { ArticleFormDataType, SectorType } from "../../types";
import { createEmptyFormData, validateFormData } from "../utils/formUtils";
import useCrawlArticleMutation from "./useCrawlArticleMutation";

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
  const [formData, setFormData] = useState<ArticleFormDataType>(() =>
    createEmptyFormData()
  );

  const fetchMetaMutation = useCrawlArticleMutation(setFormData);

  useEffect(() => {
    if (!editingData) {
      return;
    }

    setFormData(editingData);
  }, [editingData]);

  const handleMetaDataFetchButtonClick = useCallback(() => {
    if (!formData.address) {
      toast.warning("아티클 주소를 입력해주세요.");
      return;
    }

    fetchMetaMutation.mutate(formData.address);
  }, [formData.address, fetchMetaMutation]);

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
      return;
    }

    onSubmit(formData);

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
    handleMetaDataFetchButtonClick,
    handleSubmit,
    handleCancel,
  };
};
