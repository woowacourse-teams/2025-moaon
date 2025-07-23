import TechStack from "./TechStack/TechStack";
import * as S from "./TechStackList.styled";

interface TechStackListProps {
  techStacks: string[];
}

const MAX_RENDER_COUNT = 4;
function TechStackList({ techStacks }: TechStackListProps) {
  return (
    <S.TechStackList>
      {techStacks.slice(0, MAX_RENDER_COUNT).map((techStack) => (
        <TechStack
          key={techStack}
          imgUrl="https://icon.icepanel.io/Technology/svg/Spring.svg"
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
