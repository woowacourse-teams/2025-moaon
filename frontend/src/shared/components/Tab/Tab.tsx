import { useState } from "react";
import * as S from "./Tab.styled";

interface TabProps {
  items: string[];
}

function Tab({ items }: TabProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <S.TabContainer>
      <S.TabItemList>
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <S.TabItem
              key={item}
              isSelected={isSelected}
              onClick={() => setSelectedIndex(index)}
            >
              {item}
            </S.TabItem>
          );
        })}
      </S.TabItemList>
    </S.TabContainer>
  );
}

export default Tab;
