import FormField from "@shared/components/FormField/FormField";
import type { ComponentProps } from "react";

interface TextareaFormFieldProps extends ComponentProps<"textarea"> {
  title: string;
  name: string;
}

function TextareaFormField({
  title,
  name,
  value,
  onChange,
  required = true,
  placeholder,
}: TextareaFormFieldProps) {
  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title>{title}</FormField.Title>
          {required && <FormField.RequiredMark />}
        </FormField.Header>
        <FormField.Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </FormField.Wrapper>
    </FormField>
  );
}

export default TextareaFormField;
