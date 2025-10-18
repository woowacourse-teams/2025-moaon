import {
  PROJECT_CATEGORY_ENTRY,
  type ProjectCategoryKey,
} from "@domains/filter/projectCategory";
import FormField from "@shared/components/FormField/FormField";
import TagList from "@shared/components/TagList/TagList";

interface ProjectCategoryFormFieldProps {
  title: string;
  name: string;
  selectedCategories: ProjectCategoryKey[];
  onCategoryChange: (key: ProjectCategoryKey) => void;
  required?: boolean;
}

function ProjectCategoryFormField({
  title,
  name,
  selectedCategories,
  onCategoryChange,
  required = true,
}: ProjectCategoryFormFieldProps) {
  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title>{title}</FormField.Title>
          {required && <FormField.RequiredMark />}
        </FormField.Header>
        <TagList
          entries={PROJECT_CATEGORY_ENTRY}
          onSelect={onCategoryChange}
          isActive={(key) => selectedCategories.includes(key)}
        />
      </FormField.Wrapper>
    </FormField>
  );
}

export default ProjectCategoryFormField;
