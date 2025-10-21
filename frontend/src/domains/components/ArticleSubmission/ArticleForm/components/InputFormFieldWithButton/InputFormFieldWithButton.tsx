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
}: InputFormFieldWithButtonProps) {
  const hasError = !!errorMessage;

  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title>{title}</FormField.Title>
          {required && <FormField.RequiredMark />}
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
          />
          <FormField.Button buttonEvent={buttonEvent}>
            가져오기
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
