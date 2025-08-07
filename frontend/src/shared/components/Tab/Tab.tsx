import type { ArticleCategoryKey } from "@domains/filter/articleCategory";
import useSearchParams from "@shared/hooks/useSearchParams";
import * as S from "./Tab.styled";

interface TabItem {
  key: string;
  label: string;
}

interface TabProps {
  items: TabItem[];
  onSelect: () => void;
  initialValue: ArticleCategoryKey;
}

function Tab({ items, onSelect, initialValue }: TabProps) {
  const categoryParams = useSearchParams({
    key: "category",
    mode: "single",
  });
  const [rawSelectedCategory] = categoryParams.get();
  const selectedCategory = rawSelectedCategory ?? initialValue;

  const handleTabItemClick = (value: string) => {
    categoryParams.update(value, { replace: true });
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
