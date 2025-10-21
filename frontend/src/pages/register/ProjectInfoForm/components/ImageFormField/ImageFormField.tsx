import CloseButtonIcon from "@shared/components/CloseButtonIcon/CloseButtonIcon";
import { toast } from "@shared/components/Toast/toast";
import { useEffect, useState } from "react";
import { useFileDrop } from "./hooks/useFileDrop";
import * as S from "./ImageFormField.styled";

interface FileWithPreview {
  file: File;
  previewUrl: string;
}

interface ImageFormFiledProps {
  onFilesChange?: (files: File[]) => void;
}

function ImageFormField({ onFilesChange }: ImageFormFiledProps) {
  const [previews, setPreviews] = useState<FileWithPreview[]>([]);

  const {
    ref,
    isOver,
    files,
    error,
    disabled,
    getDropZoneProps,
    getFileInputProps,
    removeFile,
  } = useFileDrop({
    extensions: ["png", "jpg", "jpeg", "svg", "gif", "webp"],
    maxFiles: 2,
  });

  useEffect(() => {
    const created = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setPreviews(created);

    onFilesChange?.(files);

    return () => {
      created.forEach((preview) => URL.revokeObjectURL(preview.previewUrl));
    };
  }, [files, onFilesChange]);

  const handleRemove = (fileToRemove: File) => {
    const previewToRemove = previews.find((prev) => prev.file === fileToRemove);

    if (previewToRemove) {
      URL.revokeObjectURL(previewToRemove.previewUrl);
    }

    setPreviews(previews.filter((p) => p.file !== fileToRemove));
    removeFile(fileToRemove);
  };

  if (error?.message) {
    toast.error(error.message);
  }

  return (
    <S.ImageFormFieldWrapper>
      <S.DropZone
        ref={ref}
        {...getDropZoneProps()}
        isOver={isOver}
        disabled={disabled}
      >
        {previews.length >= 2
          ? "최대 업로드 가능한 파일 수에 도달했습니다."
          : isOver
            ? "여기에 파일을 놓으세요!"
            : "파일을 드래그 앤 드롭하거나 클릭하여 선택하세요"}
      </S.DropZone>
      <input {...getFileInputProps()} />

      <S.PreviewList>
        {previews.map(({ file, previewUrl }, idx) => {
          const isThumbnail = idx === 0;
          const { name, size, lastModified } = file;

          return (
            <S.PreviewItem
              key={`${name}-${lastModified}`}
              isThumbnail={isThumbnail}
            >
              {isThumbnail && <S.PreviewBadge>대표</S.PreviewBadge>}
              <S.PreviewImage src={previewUrl} alt={name} />
              <S.PreviewInfo>
                <S.FileName>{name}</S.FileName>
                <S.FileSize>{(size / 1024).toFixed(1)} KB</S.FileSize>
              </S.PreviewInfo>
              <S.RemoveButtonBox onClick={() => handleRemove(file)}>
                <CloseButtonIcon color={"#fff"} />
              </S.RemoveButtonBox>
            </S.PreviewItem>
          );
        })}
      </S.PreviewList>
    </S.ImageFormFieldWrapper>
  );
}

export default ImageFormField;
