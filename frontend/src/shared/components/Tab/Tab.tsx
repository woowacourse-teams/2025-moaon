import * as S from "./Tab.styled";

interface TabItem<T extends string> {
  key: T;
  label: string;
}

interface TabProps<T extends string> {
  items: TabItem<T>[];
  onSelect: (key: T) => void;
  selected: T;
}

function Tab<T extends string>({ items, selected, onSelect }: TabProps<T>) {
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
