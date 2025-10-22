import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import { useState } from "react";
import * as S from "./UserMenu.styled";

interface UserMenuItem {
  key: string;
  label: string;
}

const USER_MENU_ITEMS: UserMenuItem[] = [{ key: "logout", label: "로그아웃" }];
interface UserMenuProps<K> {
  name: string;
  direction?: "up" | "down";
  onSelect: (key: K) => void;
}

function UserMenu<K>({ name, direction = "down", onSelect }: UserMenuProps<K>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (item: UserMenuItem) => {
    onSelect(item.key as K);
    setIsOpen(false);
  };

  const top = direction === "up" ? "-200%" : "150%";

  return (
    <S.UserMenuContainer>
      <S.UserMenuButton onClick={toggleDropdown}>
        {name}님
        <ArrowIcon
          direction={isOpen ? (direction === "up" ? "down" : "up") : direction}
        />
      </S.UserMenuButton>

      {isOpen && (
        <S.UserMenuList style={{ top }}>
          {USER_MENU_ITEMS.map((item) => (
            <S.UserMenuItem key={item.key} onClick={() => handleSelect(item)}>
              {item.label}
            </S.UserMenuItem>
          ))}
        </S.UserMenuList>
      )}
    </S.UserMenuContainer>
  );
}

export default UserMenu;
