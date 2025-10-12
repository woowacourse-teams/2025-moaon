import { useCallback, useEffect, useRef, useState } from "react";
import type { FormDataType } from "../../types";
import { createEmptyFormData, validateFormData } from "../utils/formUtils";
import { useFetchMeta } from "./useFetchMeta";

interface UseArticleFormProps {
  initialData?: FormDataType;
  onSubmit: (data: FormDataType) => void;
  onUpdate?: (data: FormDataType) => void;
  onCancel?: () => void;
}

export type UseArticleFormReturn = {
  formData: FormDataType;
  setFormData: (updater: React.SetStateAction<FormDataType>) => void;
  refs: {
    urlRef: React.RefObject<HTMLInputElement | null>;
    titleRef: React.RefObject<HTMLInputElement | null>;
    descRef: React.RefObject<HTMLTextAreaElement | null>;
  };
  handlers: {
    handleFetchMeta: () => Promise<void>;
    updateSectorParams: (sector: FormDataType["sector"]) => void;
    toggleTopic: (topic: FormDataType["topic"][number]) => void;
    toggleTechStack: (tech: FormDataType["techStack"][number]) => void;
    handleSubmit: () => boolean;
    handleCancel: () => void;
  };
};

export const useArticleForm = ({
  initialData,
  onSubmit,
  onUpdate,
  onCancel,
}: UseArticleFormProps): UseArticleFormReturn => {
  const urlRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const { fill } = useFetchMeta();

  const [formData, setFormData] = useState<FormDataType>(
    initialData ?? createEmptyFormData()
  );

  const setRefsForm = useCallback((data: FormDataType) => {
    if (urlRef.current) urlRef.current.value = data.address ?? "";
    if (titleRef.current) titleRef.current.value = data.title ?? "";
    if (descRef.current) descRef.current.value = data.description ?? "";
  }, []);

  const clearRefs = useCallback(() => {
    if (urlRef.current) urlRef.current.value = "";
    if (titleRef.current) titleRef.current.value = "";
    if (descRef.current) descRef.current.value = "";
  }, []);

  useEffect(() => {
    const next = initialData ?? createEmptyFormData();
    setFormData(next);
    if (initialData) setRefsForm(next);
    else clearRefs();
  }, [initialData, setRefsForm, clearRefs]);

  const handleFetchMeta = useCallback(async () => {
    await fill({ urlInput: urlRef.current?.value ?? "", titleRef, descRef });
    setFormData((prev) => ({
      ...prev,
      title: titleRef.current?.value ?? "",
      description: descRef.current?.value ?? "",
    }));
  }, [fill]);

  const updateSectorParams = useCallback((sector: FormDataType["sector"]) => {
    setFormData((prev) => ({ ...prev, sector, topic: [], techStack: [] }));
  }, []);

  const toggleTopic = useCallback((topic: FormDataType["topic"][number]) => {
    setFormData((prev) => {
      const exists = prev.topic.includes(topic);
      return {
        ...prev,
        topic: exists
          ? prev.topic.filter((t) => t !== topic)
          : [...prev.topic, topic],
      };
    });
  }, []);

  const toggleTechStack = useCallback(
    (tech: FormDataType["techStack"][number]) => {
      setFormData((prev) => {
        const exists = prev.techStack.includes(tech);
        return {
          ...prev,
          techStack: exists
            ? prev.techStack.filter((t) => t !== tech)
            : [...prev.techStack, tech],
        };
      });
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (!validateFormData(formData)) return false;
    if (onUpdate && initialData) {
      onUpdate(formData);
      return true;
    }
    onSubmit(formData);
    setFormData(createEmptyFormData());
    clearRefs();
    return true;
  }, [formData, onSubmit, onUpdate, initialData, clearRefs]);

  const handleCancel = useCallback(() => onCancel?.(), [onCancel]);

  return {
    formData,
    setFormData,
    refs: { urlRef, titleRef, descRef },
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
