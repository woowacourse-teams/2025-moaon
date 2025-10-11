import type { PropsWithChildren } from "react";
import * as S from "./FormField.styled";

interface FormFieldProps {
  title: string;
  required?: boolean;
}

function FormField({
  children,
  required = true,
  title,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <S.FormFieldWrapper>
      <S.FormFieldHeader>
        <S.FormFieldTitle>{title}</S.FormFieldTitle>
        {required && <S.FormFieldRequired>*</S.FormFieldRequired>}
      </S.FormFieldHeader>
      {children}
    </S.FormFieldWrapper>
  );
}

export default FormField;
