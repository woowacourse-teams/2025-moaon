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
}

function MarkdownFormField({
  title,
  name,
  value,
  onChange,
  required = true,
  minLength = 100,
  maxLength = 8000,
}: MarkdownFormFieldProps) {
  const currentLength = value.length;
  const hasInput = currentLength > 0;
  const isUnderMin = hasInput && currentLength < minLength;
  const isOverMax = currentLength > maxLength;

  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title>{title}</FormField.Title>
          {required && <FormField.RequiredMark />}
        </FormField.Header>
        <ProjectOverviewEditor value={value} onChange={onChange} />
        <S.CharacterCount isError={isUnderMin || isOverMax}>
          {isUnderMin && (
            <S.MinLengthWarning>
              최소 {minLength}자 이상 입력해주세요.
            </S.MinLengthWarning>
          )}
          <S.CountText>
            {currentLength} / {maxLength}자
          </S.CountText>
        </S.CharacterCount>
      </FormField.Wrapper>
    </FormField>
  );
}

export default MarkdownFormField;
