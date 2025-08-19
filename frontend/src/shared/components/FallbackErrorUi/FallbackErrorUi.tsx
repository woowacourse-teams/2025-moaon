import { useNavigate } from "react-router";
import * as S from "./FallbackErrorUi.styled";

type ButtonOption = {
  text?: string;
  onClick?: () => void;
};

interface FallbackErrorBoundaryProps {
  scope?: "viewport" | "parent";
  title: string;
  message: string;
  buttonOptions?: ButtonOption;
}

export function FallbackErrorUi({
  scope = "parent",
  title,
  message,
  buttonOptions: button,
}: FallbackErrorBoundaryProps) {
  const navigate = useNavigate();

  const handleClick = button?.onClick ?? navigate(0);
  const label = button?.text ?? "새로고침";

  return (
    <S.ErrorContainer scope={scope}>
      <S.ErrorTitle>{title}</S.ErrorTitle>
      <S.ErrorMessage>{message}</S.ErrorMessage>
      <S.RetryButton type="button" onClick={() => handleClick}>
        {label}
      </S.RetryButton>
    </S.ErrorContainer>
  );
}
