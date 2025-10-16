import type { ComponentProps, PropsWithChildren } from "react";
import { FormFieldContext } from "./context/FormFieldContext";
import * as S from "./FormField.styled";

interface FormFieldHeaderProps {
  inputId: string;
}

interface FormFieldButtonProps {
  buttonEvent: () => void;
  type?: "button" | "submit" | "reset";
}

function FormFieldMain({ children }: PropsWithChildren) {
  return (
    <FormFieldContext.Provider value={{}}>{children}</FormFieldContext.Provider>
  );
}

function FormFieldWrapper({ children }: PropsWithChildren) {
  return <S.FormFieldWrapper>{children}</S.FormFieldWrapper>;
}

function FormFieldHeader({
  children,
  inputId,
}: PropsWithChildren<FormFieldHeaderProps>) {
  return <S.FormFieldHeader htmlFor={inputId}>{children}</S.FormFieldHeader>;
}

function FormFieldTitle({ children }: PropsWithChildren) {
  return <S.FormFieldTitle>{children}</S.FormFieldTitle>;
}

function FormFieldRequiredMark() {
  return <S.FormFieldRequiredMark>*</S.FormFieldRequiredMark>;
}

function FormFieldButton({
  children,
  buttonEvent,
  type = "button",
}: PropsWithChildren<FormFieldButtonProps>) {
  return (
    <S.FormFieldButton type={type} onClick={buttonEvent}>
      {children}
    </S.FormFieldButton>
  );
}

function FormFieldInput({
  value,
  onChange,
  name,
  type,
  id,
  placeholder,
  disabled = false,
  readOnly = false,
  required,
}: ComponentProps<"input">) {
  return (
    <S.FormFieldInput
      type={type}
      value={value}
      name={name}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}

function FormFieldTextarea({
  value,
  onChange,
  name,
  id,
  placeholder,
  disabled = false,
  readOnly = false,
  required,
}: ComponentProps<"textarea">) {
  return (
    <S.FormFieldTextarea
      value={value}
      name={name}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}

function FormFieldSelectionInput({
  value,
  onChange,
  name,
  id,
  type,
  placeholder,
  label,
  imgUrl,
  checked,
  disabled = false,
  required,
}: {
  label: string;
  type: "radio" | "checkbox";
  imgUrl?: string;
} & ComponentProps<"input">) {
  return (
    <S.FormFieldLabel htmlFor={id}>
      <S.FormFieldSelectionInput
        type={type}
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        checked={checked}
      />
      <S.FormFieldLabelInner>
        {imgUrl && <S.FormFieldLabelImage src={imgUrl} alt="" />}
        <S.FormFieldLabelText>{label}</S.FormFieldLabelText>
      </S.FormFieldLabelInner>
    </S.FormFieldLabel>
  );
}

const FormField = Object.assign(FormFieldMain, {
  Wrapper: FormFieldWrapper,
  Header: FormFieldHeader,
  Title: FormFieldTitle,
  RequiredMark: FormFieldRequiredMark,
  Button: FormFieldButton,
  Input: FormFieldInput,
  Textarea: FormFieldTextarea,
  SelectionInput: FormFieldSelectionInput,
});

export default FormField;
