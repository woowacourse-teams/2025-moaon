import * as S from "./Tab.styled";

interface TabItem<K extends string> {
  key: K;
  label: string;
}

interface TabProps<K extends string> {
  items: TabItem<K>[];
  onSelect: (key: K) => void;
  selected: K;
}

function Tab<K extends string>({ items, selected, onSelect }: TabProps<K>) {
  return (
    <S.TabContainer>
      <S.TabItemList>
        {items.map(({ key, label }) => {
          const isSelected = selected === key;
          return (
            <S.TabItem
              key={key}
              isSelected={isSelected}
              onClick={() => onSelect(key)}
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
