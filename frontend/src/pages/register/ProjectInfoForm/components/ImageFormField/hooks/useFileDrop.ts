import { toast } from "@shared/components/Toast/toast";
import {
  type ChangeEvent,
  type DragEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  isAllowedExtension,
  prepareExtensions,
} from "@/pages/register/ProjectInfoForm/components/ImageFormField/utils/fileExtensions";
import type { FileExtension } from "../types/imageType";

interface UseFileDropOptions {
  extensions?: FileExtension[];
  maxFiles?: number;
  onDrop?: (
    e: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>,
    currentFiles: File[]
  ) => void;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useFileDrop = ({
  extensions,
  maxFiles = 10,
  onDrop,
  onEnter,
  onLeave,
}: UseFileDropOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const onDropRef = useRef(onDrop);
  const onEnterRef = useRef(onEnter);
  const onLeaveRef = useRef(onLeave);

  onDropRef.current = onDrop;
  onEnterRef.current = onEnter;
  onLeaveRef.current = onLeave;

  const { normalized: fileExtension, accept: acceptString } = useMemo(
    () => prepareExtensions(extensions),
    [extensions]
  );

  const filterByExtension = useCallback(
    (arr: File[]): File[] =>
      arr.filter((file) => isAllowedExtension(file.name, fileExtension)),
    [fileExtension]
  );

  const multiple = maxFiles > 1;

  const disabled = useMemo(
    () => files.length >= maxFiles,
    [files.length, maxFiles]
  );

  const extractFiles = useCallback(
    (e: DragEvent<HTMLDivElement>) => Array.from(e.dataTransfer?.files ?? []),
    []
  );

  const processFiles = useCallback(
    (newFiles: File[]) => {
      const valid = filterByExtension(newFiles);
      const invalid = newFiles.filter((file) => !valid.includes(file));

      if (valid.length) {
        setFiles((prev) => {
          if (!multiple) {
            const first = valid[0];
            if (first) {
              return [first];
            }

            return prev;
          }

          const next = [...prev, ...valid];
          if (next.length > maxFiles) {
            setError(
              new Error(`최대 ${maxFiles}개 파일까지만 업로드할 수 있습니다.`)
            );

            return next.slice(0, maxFiles);
          }

          return next;
        });
      }

      if (invalid.length) {
        const allowed = fileExtension.join(", ");

        setError(
          new Error(`허용되지 않은 파일 형식입니다. (허용 확장자: ${allowed})`)
        );
      } else {
        setError(null);
      }

      return valid;
    },
    [filterByExtension, maxFiles, fileExtension, multiple]
  );

  const onDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      e.preventDefault();
    },
    [disabled]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      e.preventDefault();

      const all = extractFiles(e);
      const valid = processFiles(all);
      onDropRef.current?.(e, valid);
      setIsOver(false);
    },
    [disabled, extractFiles, processFiles]
  );

  const onDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      e.preventDefault();

      onEnterRef.current?.();
      setIsOver(true);
    },
    [disabled]
  );

  const onDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      e.preventDefault();
      onLeaveRef.current?.();
      setIsOver(false);
    },
    [disabled]
  );

  const onClick = useCallback(() => {
    if (disabled) {
      return;
    }

    fileInputRef.current?.click();
  }, [disabled]);

  const onFileInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }

      const newFiles = Array.from(e.target.files || []);
      const valid = processFiles(newFiles);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onDropRef.current?.(e, valid);
    },
    [disabled, processFiles]
  );

  const getDropZoneProps = useCallback(
    () => ({
      onDragOver,
      onDrop: handleDrop,
      onDragEnter,
      onDragLeave,
      onClick,
    }),
    [onDragOver, handleDrop, onDragEnter, onDragLeave, onClick]
  );

  const getFileInputProps = useCallback(
    () => ({
      ref: fileInputRef,
      type: "file",
      style: { display: "none" },
      onChange: onFileInputChange,
      accept: acceptString,
      multiple,
      disabled,
    }),
    [acceptString, onFileInputChange, multiple, disabled]
  );

  const removeFile = useCallback((fileToRemove: File) => {
    setFiles((current) => current.filter((file) => file !== fileToRemove));
  }, []);

  if (error?.message) {
    toast.error(error.message);
    setError(null);
  }

  return {
    ref,
    isOver,
    files,
    disabled,
    getDropZoneProps,
    getFileInputProps,
    removeFile,
  };
};
