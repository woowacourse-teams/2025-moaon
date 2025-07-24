export const TECH_STACK_ICON_MAP = {
  react: {
    label: "React",
    imgUrl: "https://icon.icepanel.io/Technology/svg/React.svg",
  },
  javascript: {
    label: "JavaScript",
    imgUrl: "https://icon.icepanel.io/Technology/svg/JavaScript.svg",
  },
  typescript: {
    label: "TypeScript",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
} as const;

export type TechStackKey = keyof typeof TECH_STACK_ICON_MAP;
export const TECH_STACK_ENTRY = Object.entries(TECH_STACK_ICON_MAP);
export type TechStackEntry = (typeof TECH_STACK_ENTRY)[number];
