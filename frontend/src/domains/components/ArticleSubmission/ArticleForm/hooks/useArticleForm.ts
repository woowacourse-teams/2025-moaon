import { useCallback, useEffect, useState } from "react";
import type { FormDataType } from "../../types";
import { createEmptyFormData, validateFormData } from "../utils/formUtils";
import { useFetchMeta } from "./useFetchMeta";

interface UseArticleFormProps {
  editingData?: FormDataType;
  onSubmit: (data: FormDataType) => void;
  onUpdate?: (data: FormDataType) => void;
  onCancel?: () => void;
}

export type UseArticleFormReturn = {
  formData: FormDataType;
  setFormData: (updater: React.SetStateAction<FormDataType>) => void;
  handlers: {
    handleFetchMeta: () => Promise<void>;
    updateSectorParams: (sector: FormDataType["sector"]) => void;
    toggleTopic: (topic: FormDataType["topics"][number]) => void;
    toggleTechStack: (tech: FormDataType["techStacks"][number]) => void;
    handleSubmit: () => void;
    handleCancel: () => void;
  };
};

export const useArticleForm = ({
  editingData,
  onSubmit,
  onUpdate,
  onCancel,
}: UseArticleFormProps): UseArticleFormReturn => {
  const { fill } = useFetchMeta();

  const [formData, setFormData] = useState<FormDataType>(() =>
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

  const updateSectorParams = useCallback((sector: FormDataType["sector"]) => {
    setFormData((prev) => ({ ...prev, sector, topics: [], techStacks: [] }));
  }, []);

  const toggleTopic = useCallback((topic: FormDataType["topics"][number]) => {
    setFormData((prev) => {
      const exists = prev.topics.includes(topic);
      return {
        ...prev,
        topics: exists
          ? prev.topics.filter((t) => t !== topic)
          : [...prev.topics, topic],
      };
    });
  }, []);

  const toggleTechStack = useCallback(
    (tech: FormDataType["techStacks"][number]) => {
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
    if (!validateFormData(formData)) {
      return;
    }

    if (onUpdate && editingData) {
      onUpdate(formData);
      return;
    }

    onSubmit(formData);
    setFormData(createEmptyFormData());
  }, [formData, onSubmit, onUpdate, editingData]);

  const handleCancel = useCallback(() => onCancel?.(), [onCancel]);

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
