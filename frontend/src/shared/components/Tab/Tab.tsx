import { useLayoutEffect, useRef, useState } from "react";
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
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [selectedStyle, setSelectedStyle] = useState({
    translateX: 0,
    width: 0,
  });
  const selectedIndex = items.findIndex(({ key }) => key === selected);

  useLayoutEffect(() => {
    const active = tabRefs.current[selectedIndex];
    if (active) {
      const { offsetLeft, clientWidth } = active;
      setSelectedStyle({ translateX: offsetLeft, width: clientWidth });
    }
  }, [selectedIndex]);

  const animationDuration = 0.075 * items.length;
  return (
    <S.TabContainer width={width}>
      <S.TabItemList>
        <S.SlidingBG
          translateX={selectedStyle.translateX}
          width={selectedStyle.width}
          duration={animationDuration}
        />
        {items.map(({ key, label }, idx) => {
          const isSelected = selected === key;
          return (
            <S.TabItem
              ref={(el) => {
                tabRefs.current[idx] = el;

                return () => {
                  tabRefs.current[idx] = null;
                };
              }}
              key={key}
              isSelected={isSelected}
              onClick={() => onSelect(key)}
              width={width ? width / items.length : undefined}
              duration={animationDuration}
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
