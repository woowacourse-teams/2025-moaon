import type { HTMLAttributes, InputHTMLAttributes, RefObject } from "react";
import * as S from "./FileDropZone.styled";

interface FileDropZoneProps {
  isOver: boolean;
  disabled: boolean;
  currentCount: number;
  maxFiles?: number;
  dropZoneProps: HTMLAttributes<HTMLDivElement>;
  dropZoneRef: RefObject<HTMLDivElement | null>;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

function FileDropZone({
  isOver,
  disabled,
  currentCount,
  maxFiles = 10,
  dropZoneProps,
  dropZoneRef,
  inputProps,
}: FileDropZoneProps) {
  const getMessage = () => {
    if (currentCount >= maxFiles) {
      return "최대 업로드 가능한 파일 수에 도달했어요.";
    }

    if (isOver) {
      return "여기에 파일을 놓으세요.";
    }

    return "프로젝트 카드와 상세 페이지에 보여질 이미지를 드래그하거나 클릭해 올려보세요.";
  };

  return (
    <>
      <S.DropZone
        ref={dropZoneRef}
        {...dropZoneProps}
        isOver={isOver}
        disabled={disabled}
      >
        {getMessage()}
      </S.DropZone>
      <input {...inputProps} />
    </>
  );
}

export default FileDropZone;
