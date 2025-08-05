import { TECH_STACK_ENTRY, type TechStackKey } from "@domains/filter/techStack";
import * as S from "./TechStackList.styled";

interface TechStackListProps {
  techStacks: TechStackKey[];
}

function TechStackList({ techStacks }: TechStackListProps) {
  const shownTechStacks = TECH_STACK_ENTRY.filter(([key]) =>
    techStacks.includes(key as TechStackKey),
  );

  return (
    <S.TechStackList>
      {shownTechStacks.map(([key, { label }], idx) => {
        const techStack = idx === 0 ? label : `· ${label}`;
        return <S.TechStack key={key}>{techStack}</S.TechStack>;
      })}
    </S.TechStackList>
  );
}

export default TechStackList;
