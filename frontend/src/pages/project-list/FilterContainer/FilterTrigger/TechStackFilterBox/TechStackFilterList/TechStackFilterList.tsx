import {
  TECH_STACK_ICON_MAP,
  type TechStackKey,
} from "@domains/filter/techStack";
import CloseIcon from "@shared/components/Close/Close";
import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import * as S from "./TechStackFilterList.styled";

interface TechStackListProps {
  title: string;
  techStacks: TechStackKey[];
  onSelect: () => void;
}

function TechStackFilterList({
  title,
  techStacks,
  onSelect,
}: TechStackListProps) {
  const { techStacks: selectedTechStacks, updateTechStackParam } =
    useFilterParams();

  const isSelected = selectedTechStacks.length > 0;

  const handleTechStackClick = (techStack: TechStackKey) => {
    updateTechStackParam(techStack);
    onSelect();
  };

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.List>
        {techStacks.map((techStack) => {
          const { label, imgUrl } = TECH_STACK_ICON_MAP[techStack];
          return (
            <S.Item key={techStack}>
              <S.Button
                type="button"
                onClick={() => handleTechStackClick(techStack)}
              >
                <S.IconBox>
                  <S.Icon src={imgUrl} alt={techStack} />
                </S.IconBox>
                {label}
                {isSelected && <CloseIcon />}
              </S.Button>
            </S.Item>
          );
        })}
      </S.List>
    </S.Container>
  );
}

export default TechStackFilterList;
