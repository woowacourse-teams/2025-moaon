import { useState } from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import * as S from "./Dropdown.styled";

interface DropdownItem {
  key: string;
  label: string;
  count?: number;
}

interface DropdownProps<K> {
  items: DropdownItem[];
  selected: string;
  onSelect: (key: K) => void;
}

function Dropdown<K>({ items, selected, onSelect }: DropdownProps<K>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (item: DropdownItem) => {
    onSelect(item.key as K);
    setIsOpen(false);
  };

  return (
    <S.DropdownContainer>
      <S.DropdownButton onClick={toggleDropdown}>
        {items.find((item) => item.key === selected)?.label || "선택하세요"}
        <ArrowIcon direction={isOpen ? "up" : "down"} />
      </S.DropdownButton>
      {isOpen && (
        <S.DropdownList>
          {items.map((item) => (
            <S.DropdownItem key={item.key} onClick={() => handleSelect(item)}>
              {item.label} {item.count !== undefined && `(${item.count})`}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
}

export default Dropdown;
