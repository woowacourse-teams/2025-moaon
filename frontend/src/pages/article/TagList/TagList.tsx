import Tag from "./Tag/Tag";
import * as S from "./TagList.styled";

function TagList() {
  return (
    <S.TagListContainer>
      <S.TagListTitle>태그</S.TagListTitle>
      <S.TagList>
        {[
          "JavaScript",
          "React",
          "CSS",
          "HTML",
          "Node.js",
          "TypeScript",
          "Next.js",
        ].map((tag) => (
          <Tag key={tag} Text={tag} />
        ))}
      </S.TagList>
    </S.TagListContainer>
  );
}

export default TagList;
