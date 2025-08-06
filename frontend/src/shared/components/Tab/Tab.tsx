import useSearchParams from "@shared/hooks/useSearchParams";
import * as S from "./Tab.styled";

interface TabItem {
  key: string;
  label: string;
}

interface TabProps {
  items: TabItem[];
  onSelect: () => void;
}

function Tab({ items, onSelect }: TabProps) {
  const categoryParams = useSearchParams({
    key: "category",
    mode: "single",
  });
  const [selectedCategory] = categoryParams.get();

  const handleTabItemClick = (value: string) => {
    categoryParams.update(value);
    onSelect();
  };

  return (
    <S.TabContainer>
      <S.TabItemList>
        {items.map(({ key, label }) => {
          const isSelected = selectedCategory === key;
          return (
            <S.TabItem
              key={key}
              isSelected={isSelected}
              onClick={() => handleTabItemClick(key)}
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
