export interface SubMenuParam {
  key: string;
  mode: "single" | "multi";
}
export interface SubMenuItem {
  key: string;
  label: string;
}
export interface SubMenus {
  paramsOptions: SubMenuParam;
  menus: SubMenuItem[];
}

export interface NavItem {
  id: number;
  href: string;
  text: string;
  subMenus?: SubMenus;
}
