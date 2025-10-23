import FormField from "@shared/components/FormField/FormField";
import type { ComponentProps } from "react";

interface InputFormFieldProps extends ComponentProps<"input"> {
  title: string;
  name: string;
  errorMessage?: string;
}

function InputFormField({
  title,
  name,
  value,
  onChange,
  type = "text",
  required = true,
  placeholder,
  errorMessage,
  disabled,
}: InputFormFieldProps) {
  const hasError = !!errorMessage;
  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title disabled={disabled}>{title}</FormField.Title>
          {required && <FormField.RequiredMark disabled={disabled} />}
        </FormField.Header>
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
        <FormField.ErrorBox>
          {errorMessage && <FormField.Error>{errorMessage}</FormField.Error>}
        </FormField.ErrorBox>
      </FormField.Wrapper>
    </FormField>
  );
}

export default InputFormField;
