import type { PropsWithChildren } from "react";
import * as S from "./FormField.styled";

interface FormFieldProps {
  label: string;
  required?: boolean;
}

function FormField({
  children,
  required = true,
  label,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <S.FormFieldWrapper>
      <S.FormFieldHeader>
        <S.FormFieldTitle>{label}</S.FormFieldTitle>
        {required && <S.FormFieldRequired>*</S.FormFieldRequired>}
      </S.FormFieldHeader>
      {children}
    </S.FormFieldWrapper>
  );
}

export default FormField;
