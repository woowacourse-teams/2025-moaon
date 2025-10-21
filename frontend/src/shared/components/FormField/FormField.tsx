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
  hasError,
}: ComponentProps<"input"> & { hasError?: boolean }) {
  return (
    <S.FormFieldInput
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      hasError={hasError}
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
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
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

function FormFieldError({ children }: PropsWithChildren) {
  return <S.FormFieldErrorText role="alert">{children}</S.FormFieldErrorText>;
}

function FormFieldErrorBox({ children }: PropsWithChildren) {
  return <S.FormFieldErrorBox>{children}</S.FormFieldErrorBox>;
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
  Error: FormFieldError,
  ErrorBox: FormFieldErrorBox,
});

export default FormField;
