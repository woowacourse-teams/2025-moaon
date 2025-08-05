import { TECH_STACK_ICON_MAP } from "@domains/filter/techStack";
import Tag from "./Tag/Tag";
import * as S from "./TagList.styled";

function TagList() {
  return (
    <S.TagListContainer>
      <S.TagListTitle>태그</S.TagListTitle>
      <S.TagList>
        {Object.values(TECH_STACK_ICON_MAP).map((tag) => (
          <Tag key={tag.label} text={tag.label} />
        ))}
      </S.TagList>
    </S.TagListContainer>
  );
}

export default TagList;
