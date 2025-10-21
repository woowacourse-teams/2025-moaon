import TechStackSearchBar from "@domains/components/TechStackFilterBox/TechStackSearchBar/TechStackSearchBar";
import {
  TECH_STACK_ICON_MAP,
  type TechStackKey,
} from "@domains/filter/techStack";
import CloseButtonIcon from "@shared/components/CloseButtonIcon/CloseButtonIcon";
import FormField from "@shared/components/FormField/FormField";
import * as S from "./TechStackFormField.styled";

interface TechStackFormFieldProps {
  title: string;
  name: string;
  selectedTechStacks: TechStackKey[];
  onTechStackChange: (techStack: TechStackKey) => void;
  required?: boolean;
  errorMessage?: string;
}

function TechStackFormField({
  title,
  name,
  selectedTechStacks,
  onTechStackChange,
  required = true,
  errorMessage,
}: TechStackFormFieldProps) {
  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title>{title}</FormField.Title>
          {required && <FormField.RequiredMark />}
        </FormField.Header>

        <TechStackSearchBar
          mode="controlled"
          selectedTechStacks={selectedTechStacks}
          onTechStackChange={onTechStackChange}
        />

        {selectedTechStacks.length > 0 && (
          <S.SelectedTechStacks>
            {selectedTechStacks.map((techStack) => (
              <S.TechStackTag key={techStack}>
                {TECH_STACK_ICON_MAP[techStack].label}
                <S.CloseButtonBox>
                  <CloseButtonIcon
                    iconSize={10}
                    onClick={() => onTechStackChange(techStack)}
                    aria-label={`${TECH_STACK_ICON_MAP[techStack].label} 제거`}
                  />
                </S.CloseButtonBox>
              </S.TechStackTag>
            ))}
          </S.SelectedTechStacks>
        )}
        <FormField.ErrorBox>
          {errorMessage && <FormField.Error>{errorMessage}</FormField.Error>}
        </FormField.ErrorBox>
      </FormField.Wrapper>
    </FormField>
  );
}

export default TechStackFormField;
