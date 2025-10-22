import FormField from "@shared/components/FormField/FormField";
import ProjectOverviewEditor from "@/pages/register/ProjectOverviewEditor/ProjectOverviewEditor";
import * as S from "./MarkdownFormField.styled";

interface MarkdownFormFieldProps {
  title: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
}

function MarkdownFormField({
  title,
  name,
  value,
  onChange,
  required = true,
  minLength = 100,
  maxLength = 8000,
  errorMessage,
}: MarkdownFormFieldProps) {
  const currentLength = value.length;
  const hasInput = currentLength > 0;
  const isUnderMin = hasInput && currentLength < minLength;
  const isOverMax = currentLength > maxLength;
  const hasError = !!errorMessage;

  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title>{title}</FormField.Title>
          {required && <FormField.RequiredMark />}
        </FormField.Header>
        <ProjectOverviewEditor
          value={value}
          onChange={onChange}
          hasError={hasError}
        />
        <S.CharacterCount isError={isUnderMin || isOverMax}>
          <FormField.ErrorBox>
            {errorMessage && <FormField.Error>{errorMessage}</FormField.Error>}
          </FormField.ErrorBox>
          <S.CountText>
            {currentLength} / {maxLength}자
          </S.CountText>
        </S.CharacterCount>
      </FormField.Wrapper>
    </FormField>
  );
}

export default MarkdownFormField;
