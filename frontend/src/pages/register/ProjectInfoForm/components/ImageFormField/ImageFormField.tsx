import { useEffect } from "react";
import FileDropZone from "./components/FileDropZone/FileDropZone";
import ImagePreviewItem from "./components/ImagePreviewList/ImagePreviewItem/ImagePreviewItem";
import ImagePreviewList from "./components/ImagePreviewList/ImagePreviewList";
import { useFileDrop } from "./hooks/useFileDrop";
import { useImagePreviews } from "./hooks/useImagePreviews";
import * as S from "./ImageFormField.styled";

interface ImageFormFiledProps {
  onSubmit?: (files: File[]) => void | Promise<void>;
}

function ImageFormField({ onSubmit }: ImageFormFiledProps) {
  const { ref, isOver, files, disabled, getDropZoneProps, getFileInputProps } =
    useFileDrop({
      extensions: ["png", "jpg", "jpeg", "svg", "gif", "webp"],
    });

  const { previews, removeFile } = useImagePreviews(files);

  useEffect(() => {
    const form = ref.current?.closest("form");
    if (!form) {
      return;
    }

    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      onSubmit?.(files);
    };

    form.addEventListener("submit", handleSubmit);
    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, [files, onSubmit, ref]);

  return (
    <S.ImageFormFieldWrapper>
      <FileDropZone
        isOver={isOver}
        disabled={disabled}
        currentCount={files.length}
        dropZoneRef={ref}
        dropZoneProps={getDropZoneProps()}
        inputProps={getFileInputProps()}
      />

      <ImagePreviewList>
        {previews.map(({ file, previewUrl }, idx) => {
          const isThumbnail = idx === 0;
          const stableKey = `${file.name}-${file.size}-${file.lastModified}`;

          return (
            <ImagePreviewItem
              key={stableKey}
              file={file}
              previewUrl={previewUrl}
              isThumbnail={isThumbnail}
              onRemove={removeFile}
            />
          );
        })}
      </ImagePreviewList>
    </S.ImageFormFieldWrapper>
  );
}

export default ImageFormField;
