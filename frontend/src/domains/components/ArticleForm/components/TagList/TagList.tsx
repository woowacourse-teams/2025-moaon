import Tag from "./Tag/Tag";
import * as S from "./TagList.styled";

interface TagListProps {
  entries: [string, { label: string }][];
}

function TagList({ entries }: TagListProps) {
  return (
    <S.TagListBox>
      {entries.map(([key, { label }]) => (
        <Tag key={key} title={label} />
      ))}
    </S.TagListBox>
  );
}

export default TagList;
