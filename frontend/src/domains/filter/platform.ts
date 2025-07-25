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

export type PlatformKey = keyof typeof PLATFORM_ICON_MAP;
export const PLATFORM_ENTRY = Object.entries(PLATFORM_ICON_MAP);
export type PlatformEntry = (typeof PLATFORM_ENTRY)[number];
