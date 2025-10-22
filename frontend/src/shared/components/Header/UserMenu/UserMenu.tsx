import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import { useState } from "react";
import * as S from "./UserMenu.styled";

interface UserMenuItem {
  key: string;
  label: string;
  count?: number;
}

interface UserMenuProps<K> {
  items: UserMenuItem[];
  name: string;
  direction?: "up" | "down";
  onSelect: (key: K) => void;
}

function UserMenu<K>({
  items,
  name,
  direction = "down",
  onSelect,
}: UserMenuProps<K>) {
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
          {items.map((item) => (
            <S.UserMenuItem key={item.key} onClick={() => handleSelect(item)}>
              {item.label} {item.count !== undefined && `(${item.count})`}
            </S.UserMenuItem>
          ))}
        </S.UserMenuList>
      )}
    </S.UserMenuContainer>
  );
}

export default UserMenu;
