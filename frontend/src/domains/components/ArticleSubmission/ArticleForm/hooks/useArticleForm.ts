import { toast } from "@shared/components/Toast/toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ArticleFormDataType, SectorType } from "../../types";
import {
  type ArticleFormErrors,
  createEmptyFormData,
  validateField,
  validateFormData,
} from "../utils/formUtils";
import { useCrawlArticleMutation } from "./useCrawlArticleMutation";

interface UseArticleFormProps {
  editingData?: ArticleFormDataType;
  onSubmit: (data: ArticleFormDataType) => void;
  onUpdate: (data: ArticleFormDataType) => void;
  onCancel: () => void;
}

const isEmptyValue = (value: unknown) => {
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "string") return value.trim().length === 0;
  return value === undefined || value === null;
};

export const useArticleForm = ({
  editingData,
  onSubmit,
  onUpdate,
  onCancel,
}: UseArticleFormProps) => {
  const [isButtonClicked, setIsButtonClicked] = useState(true);
  const [formData, setFormData] = useState<ArticleFormDataType>(() =>
    createEmptyFormData()
  );
  const [errors, setErrors] = useState<ArticleFormErrors>({});

  const fetchMetaMutation = useCrawlArticleMutation(setFormData);

  const isFormValid = useMemo(() => {
    const validationErrors = validateFormData(formData);
    return Object.values(validationErrors).every((error) => !error);
  }, [formData]);

  useEffect(() => {
    if (!editingData) {
      return;
    }

    setFormData(editingData);
    setIsButtonClicked(false);
  }, [editingData]);

  const handleMetaDataFetchButtonClick = useCallback(async () => {
    if (!formData.address) {
      toast.warning("아티클 주소를 입력해주세요.");
      return;
    }

    fetchMetaMutation.mutate(formData.address, () => {
      setIsButtonClicked(false);
    });
  }, [formData.address, fetchMetaMutation]);

  const updateFormFieldData = useCallback(
    <K extends keyof ArticleFormDataType>(
      field: K,
      value: ArticleFormDataType[K]
    ) => {
      setFormData((prev) => {
        const next = { ...prev, [field]: value };

        if (isEmptyValue(value)) {
          setErrors((prevErr) => ({ ...prevErr, [field]: undefined }));
          return next;
        }

        const msg = validateField(
          field as keyof ArticleFormErrors,
          value as string,
          next
        );
        setErrors((prevErr) => ({ ...prevErr, [field]: msg || undefined }));
        return next;
      });
    },
    []
  );

  const updateNestedField = useCallback(
    <
      K extends keyof ArticleFormDataType,
      T extends keyof NonNullable<ArticleFormDataType[K]>
    >(
      field: K,
      subField: T,
      subValue: NonNullable<ArticleFormDataType[K]>[T]
    ) => {
      setFormData((prev) => {
        const next = {
          ...prev,
          [field]: {
            ...(prev[field] as SectorType),
            [subField]: subValue,
          },
        };

        if (field === "sector") {
          if (subField === "value") {
            const msg = validateField("sectorValue", subValue as string, next);
            setErrors((prevErr) => ({
              ...prevErr,
              sectorValue: msg || undefined,
            }));

            setErrors((prevErr) => ({
              ...prevErr,
              techStacks: undefined,
              topics: undefined,
            }));
          } else if (subField === "techStacks") {
            if (Array.isArray(subValue) && subValue.length === 0) {
              setErrors((prevErr) => ({ ...prevErr, techStacks: undefined }));
            } else {
              const msg = validateField(
                "techStacks",
                subValue as string[],
                next
              );
              setErrors((prevErr) => ({
                ...prevErr,
                techStacks: msg || undefined,
              }));
            }
          } else if (subField === "topics") {
            if (Array.isArray(subValue) && subValue.length === 0) {
              setErrors((prevErr) => ({ ...prevErr, topics: undefined }));
            } else {
              const msg = validateField("topics", subValue as string[], next);
              setErrors((prevErr) => ({
                ...prevErr,
                topics: msg || undefined,
              }));
            }
          }
        }

        return next;
      });
    },
    []
  );

  const handleSubmit = useCallback(() => {
    const nextErrors = validateFormData(formData);
    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some((m) => m && m.length > 0);
    if (hasError) {
      return;
    }

    if (onUpdate && editingData) {
      onUpdate(formData);
      setFormData(createEmptyFormData());
      setIsButtonClicked(true);
      return;
    }

    onSubmit(formData);
    setFormData(createEmptyFormData());
    setIsButtonClicked(true);
    setErrors({});
  }, [formData, onSubmit, onUpdate, editingData]);

  const handleCancel = useCallback(() => {
    onCancel();
    setFormData(createEmptyFormData());
    setIsButtonClicked(true);
    setErrors({});
  }, [onCancel]);

  return {
    formData,
    isButtonClicked,
    errors,
    isFormValid,
    updateFormFieldData,
    updateNestedField,
    handleMetaDataFetchButtonClick,
    handleSubmit,
    handleCancel,
    loading: fetchMetaMutation.isPending,
  };
};
