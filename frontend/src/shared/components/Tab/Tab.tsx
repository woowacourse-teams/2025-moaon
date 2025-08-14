import * as S from "./Tab.styled";

interface TabItem<K extends string> {
  key: K;
  label: string;
  width?: number;
}

interface TabProps<K extends string> {
  items: TabItem<K>[];
  onSelect: (key: K) => void;
  selected: K;
  width?: number;
}

function Tab<K extends string>({
  items,
  selected,
  onSelect,
  width,
}: TabProps<K>) {
  return (
    <S.TabContainer width={width}>
      <S.TabItemList>
        {items.map(({ key, label }) => {
          const isSelected = selected === key;
          return (
            <S.TabItem
              key={key}
              isSelected={isSelected}
              onClick={() => onSelect(key)}
              width={width ? width / items.length : undefined}
            >
              {label}
            </S.TabItem>
          );
        })}
      </S.TabItemList>
    </S.TabContainer>
  );
}

export default Tab;
