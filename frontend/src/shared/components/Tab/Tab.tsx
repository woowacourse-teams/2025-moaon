import useSearchParams from "@shared/hooks/useSearchParams";
import { useEffect, useState } from "react";
import useArticleList from "../../../pages/article/hooks/useArticleList";
import * as S from "./Tab.styled";

interface TabItem {
  key: string;
  label: string;
}

interface TabProps {
  items: TabItem[];
}

function Tab({ items }: TabProps) {
  const categoryParams = useSearchParams({
    key: "category",
    mode: "single",
  });
  const { refetch } = useArticleList();
  const [selectedCategory] = categoryParams.get();
  const selectedIndex = selectedCategory
    ? items.findIndex((item) => item.key === selectedCategory)
    : 0;
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  useEffect(() => {
    setCurrentIndex(selectedIndex);
  }, [selectedIndex]);

  const handleTabItemClick = (value: string, index: number) => {
    setCurrentIndex(index);
    categoryParams.update(value);
    refetch();
  };

  return (
    <S.TabContainer>
      <S.TabItemList>
        {items.map(({ key, label }, index) => {
          const isSelected = currentIndex === index;
          return (
            <S.TabItem
              key={key}
              isSelected={isSelected}
              onClick={() => handleTabItemClick(key, index)}
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
