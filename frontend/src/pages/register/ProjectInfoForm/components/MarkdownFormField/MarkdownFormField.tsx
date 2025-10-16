import FormField from "@shared/components/FormField/FormField";
import ProjectOverviewEditor from "@/pages/register/ProjectOverviewEditor/ProjectOverviewEditor";

interface MarkdownFormFieldProps {
  title: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function MarkdownFormField({
  title,
  name,
  value,
  onChange,
  required = true,
}: MarkdownFormFieldProps) {
  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title>{title}</FormField.Title>
          {required && <FormField.RequiredMark />}
        </FormField.Header>
        <ProjectOverviewEditor value={value} onChange={onChange} />
      </FormField.Wrapper>
    </FormField>
  );
}

export default MarkdownFormField;
