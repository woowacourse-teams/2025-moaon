import { toast } from "@shared/components/Toast/toast";
import { useCallback, useEffect, useState } from "react";
import type { ArticleFormDataType } from "../../types";
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

  const updateSectorParams = useCallback(
    (sector: ArticleFormDataType["sector"]) => {
      setFormData((prev) => ({ ...prev, sector, topics: [], techStacks: [] }));
    },
    []
  );

  const toggleTopic = useCallback(
    (topic: ArticleFormDataType["topics"][number]) => {
      setFormData((prev) => {
        const exists = prev.topics.includes(topic);
        return {
          ...prev,
          topics: exists
            ? prev.topics.filter((t) => t !== topic)
            : [...prev.topics, topic],
        };
      });
    },
    []
  );

  const toggleTechStack = useCallback(
    (tech: ArticleFormDataType["techStacks"][number]) => {
      setFormData((prev) => {
        const exists = prev.techStacks.includes(tech);
        return {
          ...prev,
          techStacks: exists
            ? prev.techStacks.filter((t) => t !== tech)
            : [...prev.techStacks, tech],
        };
      });
    },
    []
  );

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
    setFormData,
    handlers: {
      handleFetchMeta,
      updateSectorParams,
      toggleTopic,
      toggleTechStack,
      handleSubmit,
      handleCancel,
    },
  };
};
