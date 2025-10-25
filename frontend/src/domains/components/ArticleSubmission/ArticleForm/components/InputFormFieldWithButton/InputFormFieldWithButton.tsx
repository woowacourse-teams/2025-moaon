import FormField from "@shared/components/FormField/FormField";
import type { ComponentProps } from "react";
import * as S from "./InputFormFieldWithButton.styled";

interface InputFormFieldWithButtonProps extends ComponentProps<"input"> {
  title: string;
  name: string;
  buttonEvent: () => void;
  errorMessage?: string;
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
        </S.InputFormFieldWithButtonWrapper>
        <FormField.ErrorBox>
          {errorMessage && <FormField.Error>{errorMessage}</FormField.Error>}
        </FormField.ErrorBox>
      </FormField.Wrapper>
    </FormField>
  );
}

export default InputFormFieldWithButton;
