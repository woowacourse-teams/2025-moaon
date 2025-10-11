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

export const useArticleForm = ({
  initialData,
  onSubmit,
  onUpdate,
  onCancel,
}: UseArticleFormProps) => {
  const urlRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const { fill } = useFetchMeta();

  const [formData, setFormData] = useState<FormDataType>(
    initialData ?? createEmptyFormData()
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (urlRef.current) urlRef.current.value = initialData.address ?? "";
      if (titleRef.current) titleRef.current.value = initialData.title ?? "";
      if (descRef.current)
        descRef.current.value = initialData.description ?? "";
    } else {
      setFormData(createEmptyFormData());
      if (urlRef.current) urlRef.current.value = "";
      if (titleRef.current) titleRef.current.value = "";
      if (descRef.current) descRef.current.value = "";
    }
  }, [initialData]);

  const handleFetchMeta = useCallback(async () => {
    await fill({ urlInput: urlRef.current?.value ?? "", titleRef, descRef });
    setFormData((prev) => ({
      ...prev,
      title: titleRef.current?.value ?? "",
      description: descRef.current?.value ?? "",
    }));
  }, [fill]);

  const updateSectorParams = useCallback((data: FormDataType["sector"]) => {
    setFormData((prev) => ({
      ...prev,
      sector: data,
      topic: [],
      techStack: [],
    }));
  }, []);

  const toggleTopic = useCallback((data: FormDataType["topic"][number]) => {
    setFormData((prev) => {
      const isInclude = prev.topic.includes(data);
      if (isInclude)
        return { ...prev, topic: prev.topic.filter((t) => t !== data) };
      return { ...prev, topic: [...prev.topic, data] };
    });
  }, []);

  const toggleTechStack = useCallback(
    (data: FormDataType["techStack"][number]) => {
      setFormData((prev) => {
        const isInclude = prev.techStack.includes(data);
        if (isInclude)
          return {
            ...prev,
            techStack: prev.techStack.filter((t) => t !== data),
          };
        return { ...prev, techStack: [...prev.techStack, data] };
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
    if (urlRef.current) urlRef.current.value = "";
    if (titleRef.current) titleRef.current.value = "";
    if (descRef.current) descRef.current.value = "";
    return true;
  }, [formData, onSubmit, onUpdate, initialData]);

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

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
