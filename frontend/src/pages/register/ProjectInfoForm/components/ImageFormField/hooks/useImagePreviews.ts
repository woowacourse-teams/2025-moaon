import { useEffect, useRef, useState } from "react";

interface FilePreviewMap {
  file: File;
  previewUrl: string;
}

export function useImagePreviews(
  files: File[],
  onFilesChange?: (files: File[]) => void
) {
  const [previews, setPreviews] = useState<FilePreviewMap[]>([]);
  const urlMapRef = useRef<Map<File, string>>(new Map());

  useEffect(() => {
    const urlMap = urlMapRef.current;
    const newFiles = new Set(files);
    const existingFiles = new Set(urlMap.keys());

    existingFiles.forEach((file) => {
      if (!newFiles.has(file)) {
        const url = urlMap.get(file);
        if (url) {
          URL.revokeObjectURL(url);
          urlMap.delete(file);
        }
      }
    });

    files.forEach((file) => {
      if (!urlMap.has(file)) {
        const previewUrl = URL.createObjectURL(file);
        urlMap.set(file, previewUrl);
      }
    });

    const newPreviews = files
      .map((file) => {
        const previewUrl = urlMap.get(file);
        if (!previewUrl) {
          return null;
        }

        return { file, previewUrl };
      })
      .filter((preview): preview is FilePreviewMap => preview !== null);

    setPreviews(newPreviews);

    return () => {
      urlMap.forEach((url) => URL.revokeObjectURL(url));
      urlMap.clear();
    };
  }, [files]);

  const removeFile = (fileToRemove: File) => {
    setPreviews((prevPreviews) =>
      prevPreviews.filter(({ file }) => file !== fileToRemove)
    );
    const newFiles = files.filter((file) => file !== fileToRemove);
    onFilesChange?.(newFiles);
  };

  return { previews, removeFile };
}
