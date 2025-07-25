import {
  TECH_STACK_ICON_MAP,
  type TechStackKey,
} from "@domains/filter/techStack";
import TechStack from "./TechStack/TechStack";
import * as S from "./TechStackList.styled";

interface TechStackListProps {
  techStacks: TechStackKey[];
}

const MAX_RENDER_COUNT = 4;
function TechStackList({ techStacks }: TechStackListProps) {
  return (
    <S.TechStackList>
      {techStacks.slice(0, MAX_RENDER_COUNT).map((techStack) => (
        <TechStack
          key={techStack}
          imgUrl={TECH_STACK_ICON_MAP[techStack]?.imgUrl}
          techStackName={TECH_STACK_ICON_MAP[techStack]?.label}
        />
      ))}
      {techStacks.length > MAX_RENDER_COUNT && (
        <S.AdditionalCount>
          + {techStacks.length - MAX_RENDER_COUNT}
        </S.AdditionalCount>
      )}
    </S.TechStackList>
  );
}

export default TechStackList;
