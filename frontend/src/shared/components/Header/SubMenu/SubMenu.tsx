import useSearchParams from "@shared/hooks/useSearchParams";
import { useTabAnimation } from "@shared/hooks/useTabAnimation";
import type { SubMenus } from "../types/Header.types";
import * as S from "./SubMenu.styled";

interface SubMenuProps {
  items: SubMenus;
}

function SubMenu({ items }: SubMenuProps) {
  const { menus, paramsOptions } = items;
  const params = useSearchParams(paramsOptions);
  const rawSelectedParams = params.get()[0];
  const selectedIndex = menus.findIndex(
    (item) => item.key === (rawSelectedParams ?? menus[0].key),
  );
  const { setTabElementsRef, selectedStyle } = useTabAnimation({
    selectedIndex,
    duration: 0.75,
  });
  const hasActive = selectedIndex > -1;

  return (
    <S.SubMenuList>
      {menus.map(({ key, label }, idx) => (
        <S.SubMenuItem
          key={label}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              params.update(key, { replace: true });
            }
          }}
          onClick={() => {
            params.update(key, { replace: true, reset: true });
          }}
          ref={(el) => setTabElementsRef(el, idx)}
        >
          {label}
        </S.SubMenuItem>
      ))}
      {hasActive && (
        <S.Underline
          translateX={selectedStyle.translateX}
          width={selectedStyle.width}
          duration={selectedStyle.duration}
        />
      )}
    </S.SubMenuList>
  );
}

export default SubMenu;
