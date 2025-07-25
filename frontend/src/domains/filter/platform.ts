export const PLATFORM_ICON_MAP = {
  web: {
    label: "Web",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/platforms/web.svg",
  },
  desktop: {
    label: "Desktop",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/platforms/desktop.svg",
  },
  ios: {
    label: "iOS",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/platforms/ios.svg",
  },
  android: {
    label: "Android",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/platforms/android.svg",
  },
} as const;

export type PlatformKey = keyof typeof PLATFORM_ICON_MAP;
export const PLATFORM_ENTRY = Object.entries(PLATFORM_ICON_MAP);
export type PlatformEntry = (typeof PLATFORM_ENTRY)[number];
