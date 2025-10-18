import Tag from "./Tag/Tag";
import * as S from "./TagList.styled";

export type EntryTuple<K> = readonly [K, { label: string; imgUrl?: string }];

interface TagListProps<K> {
  entries: ReadonlyArray<EntryTuple<K>>;
  onSelect: (key: K) => void;
  isActive: (key: K) => boolean;
}

function TagList<K extends string>({
  entries,
  onSelect,
  isActive,
}: TagListProps<K>) {
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
