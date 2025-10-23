import FormField from "@shared/components/FormField/FormField";
import type { ComponentProps } from "react";
import * as S from "./InputFormFieldWithButton.styled";

interface InputFormFieldWithButtonProps extends ComponentProps<"input"> {
  title: string;
  name: string;
  buttonEvent: () => void;
  errorMessage?: string;
  descriptionToken: number;
}

function InputFormFieldWithButton({
  title,
  name,
  value,
  onChange,
  type = "text",
  required = true,
  placeholder,
  buttonEvent,
  errorMessage,
  disabled,
  descriptionToken,
}: InputFormFieldWithButtonProps) {
  const hasError = !!errorMessage;
  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title disabled={disabled}>{title}</FormField.Title>
          {required && <FormField.RequiredMark disabled={disabled} />}
        </FormField.Header>
        <S.InputFormFieldWithButtonWrapper>
          <FormField.Input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            required={required}
            hasError={hasError}
            disabled={disabled}
          />
          <FormField.Button buttonEvent={buttonEvent} disabled={disabled}>
            검증하기
          </FormField.Button>
          {descriptionToken === 0 && (
            <S.InputFormFieldText isTokenZero={descriptionToken === 0}>
              1일 요약 한도가 초과되었습니다. <br />
              직접 입력 하거나 내일 다시 시도해주세요 🥹
            </S.InputFormFieldText>
          )}
        </S.InputFormFieldWithButtonWrapper>
        <FormField.ErrorBox>
          {errorMessage && <FormField.Error>{errorMessage}</FormField.Error>}
        </FormField.ErrorBox>
      </FormField.Wrapper>
    </FormField>
  );
}

export default InputFormFieldWithButton;
