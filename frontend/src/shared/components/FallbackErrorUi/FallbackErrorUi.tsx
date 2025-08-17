import type { MouseEventHandler } from "react";
import * as S from "./FallbackErrorUi.styled";

type ButtonOption = {
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

interface FallbackErrorBoundaryProps {
  scope?: "viewport" | "parent";
  title: string;
  message: string;
  button?: ButtonOption;
}

export function FallbackErrorUi({
  scope = "parent",
  title,
  message,
  button,
}: FallbackErrorBoundaryProps) {
  const defaultReload: MouseEventHandler<HTMLButtonElement> = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  const handleClick = button?.onClick ?? defaultReload;
  const label = button?.text ?? "새로고침";

  return (
    <S.ErrorContainer scope={scope}>
      <S.ErrorTitle>{title}</S.ErrorTitle>
      <S.ErrorMessage>{message}</S.ErrorMessage>
      <S.RetryButton type="button" onClick={handleClick}>
        {label}
      </S.RetryButton>
    </S.ErrorContainer>
  );
}
