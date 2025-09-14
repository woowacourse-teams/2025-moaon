import type { SubMenuItem } from "../types/Header.types";

interface SubMenuProps {
  items: SubMenuItem[];
}

function SubMenu({ items }: SubMenuProps) {
  return (
    <ul
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 0",
      }}
    >
      {items.map(({ key, label }) => (
        <li key={label} style={{ width: `100px`, textAlign: "center" }}>
          {label}
        </li>
      ))}
    </ul>
  );
}

export default SubMenu;
