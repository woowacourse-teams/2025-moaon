import { TECH_STACK_ICON_MAP } from "@domains/filter/techStack";
import Tag from "./Tag/Tag";
import * as S from "./TagList.styled";

function TagList() {
  const techStacks = Object.values(TECH_STACK_ICON_MAP);

  return (
    <S.TagListContainer>
      <S.TagListTitle>태그</S.TagListTitle>
      <S.TagList>
        {techStacks.map(({ label }) => (
          <Tag key={label} text={label} />
        ))}
      </S.TagList>
    </S.TagListContainer>
  );
}

export default TagList;
