import { useTabAnimation } from "@shared/hooks/useTabAnimation";
import * as S from "./Tab.styled";

interface TabItem<K extends string> {
  key: K;
  label: string;
  count?: number;
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
  const selectedIndex = items.findIndex(({ key }) => key === selected);
  const { setTabElementsRef, selectedStyle } = useTabAnimation({
    selectedIndex,
    duration: 0.075 * items.length,
  });

  return (
    <S.TabContainer width={width}>
      <S.TabItemList>
        <S.SlidingBG
          translateX={selectedStyle.translateX}
          width={selectedStyle.width}
          duration={selectedStyle.duration}
        />
        {items.map(({ key, label, count }, idx) => {
          const isSelected = selected === key;
          const disabled = count === 0;
          if (disabled) {
            return (
              <S.DisabledTabItem key={key} tabCount={items.length}>
                {label}
                <S.DisabledCountText>{`(${count})`}</S.DisabledCountText>
              </S.DisabledTabItem>
            );
          }

          console.log(key, count);
          return (
            <S.TabItem
              ref={(el) => setTabElementsRef(el, idx)}
              key={key}
              isSelected={isSelected}
              onClick={() => onSelect(key)}
              width={width ? width / items.length : undefined}
              duration={selectedStyle.duration}
            >
              {label}
              {typeof count === "number" && (
                <S.CountText>{`(${count})`}</S.CountText>
              )}
            </S.TabItem>
          );
        })}
      </S.TabItemList>
    </S.TabContainer>
  );
}

export default Tab;
