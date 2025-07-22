import IconBadge from "./IconBadge/IconBadge";
import * as S from "./IconBadgeList.styled";

interface IconBadgeListProps {
  iconBadges: string[];
}

const techIconMap: Record<string, { label: string; imgUrl: string }> = {
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
};

const platformIconMap: Record<string, { label: string; imgUrl: string }> = {
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
};

const all = {
  ...techIconMap,
  ...platformIconMap,
};

function IconBadgeList({ iconBadges }: IconBadgeListProps) {
  return (
    <S.IconBadgeList>
      {iconBadges.map((iconBadge) => {
        const { label, imgUrl } = all[iconBadge];
        return <IconBadge key={iconBadge} label={label} imgUrl={imgUrl} />;
      })}
    </S.IconBadgeList>
  );
}

export default IconBadgeList;
