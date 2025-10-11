import Tag from "./Tag/Tag";
import * as S from "./TagList.styled";

export type EntryTuple<T extends string = string> = readonly [
  T,
  { label: string; imgUrl?: string },
];

interface TagListProps<T extends string> {
  entries: ReadonlyArray<EntryTuple<T>>;
  onSelect: (key: T) => void;
  isActive: (key: T) => boolean;
}

function TagList<T extends string>({
  entries,
  onSelect,
  isActive,
}: TagListProps<T>) {
  return (
    <S.TagListBox>
      {entries.map(([key, { label, imgUrl }]) => {
        return (
          <Tag
            key={key}
            title={label}
            onClick={() => onSelect(key)}
            isActive={isActive(key)}
            imgUrl={imgUrl}
          />
        );
      })}
    </S.TagListBox>
  );
}

export default TagList;
