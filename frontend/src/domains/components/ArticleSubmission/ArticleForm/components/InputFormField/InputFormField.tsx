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
}: InputFormFieldProps) {
  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title>{title}</FormField.Title>
          {required && <FormField.RequiredMark />}
        </FormField.Header>
        <FormField.Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          required={required}
        />
        <FormField.ErrorBox>
          {errorMessage && <FormField.Error>{errorMessage}</FormField.Error>}
        </FormField.ErrorBox>
      </FormField.Wrapper>
    </FormField>
  );
}

export default InputFormField;
