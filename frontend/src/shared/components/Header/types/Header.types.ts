export interface SubMenuItem {
  key: string;
  label: string;
}

export interface NavItem {
  id: number;
  href: string;
  text: string;
  subMenus?: SubMenuItem[];
}
