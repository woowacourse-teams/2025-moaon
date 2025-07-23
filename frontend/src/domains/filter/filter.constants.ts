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
  nextjs: {
    label: "Next.js",
    imgUrl: "https://icon.icepanel.io/Technology/svg/NextJS.svg",
  },
} as const;

export const PLATFORM_ICON_MAP = {
  web: {
    label: "Web",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
  },
  desktop: {
    label: "Desktop",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  ios: {
    label: "iOS",
    imgUrl: "https://icon.icepanel.io/Technology/svg/React.svg",
  },
  android: {
    label: "Android",
    imgUrl: "https://icon.icepanel.io/Technology/svg/NextJS.svg",
  },
} as const;

export const ICON_BADGE_MAP = {
  ...TECH_STACK_ICON_MAP,
  ...PLATFORM_ICON_MAP,
} as const;
