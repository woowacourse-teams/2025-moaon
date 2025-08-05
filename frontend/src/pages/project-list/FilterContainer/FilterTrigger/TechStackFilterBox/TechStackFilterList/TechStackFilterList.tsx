import {
  TECH_STACK_ICON_MAP,
  type TechStackKey,
} from "@domains/filter/techStack";
import closeIcon from "@/assets/icons/close.svg";
import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import useProjectList from "@/pages/project-list/hooks/useProjectList";
import * as S from "./TechStackFilterList.styled";

interface TechStackListProps {
  title: string;
  techStacks: TechStackKey[];
}

function TechStackFilterList({ title, techStacks }: TechStackListProps) {
  const { techStacks: selectedTechStacks, updateTechStackParam } =
    useFilterParams();
  const { refetch } = useProjectList();
  const isSelected = selectedTechStacks.length > 0;

  const handleTechStackClick = (techStack: TechStackKey) => {
    updateTechStackParam(techStack);
    refetch();
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
                {isSelected && <S.CloseIcon src={closeIcon} alt="선택 해제" />}
              </S.Button>
            </S.Item>
          );
        })}
      </S.List>
    </S.Container>
  );
}

export default TechStackFilterList;
