import { PLATFORM_ICON_MAP, TECH_ICON_MAP } from "./constants/iconMap";
import IconBadge from "./IconBadge/IconBadge";
import * as S from "./IconBadgeList.styled";

interface IconBadgeListProps {
  iconBadges: string[];
}

const iconBadgeMap: Record<string, { label: string; imgUrl: string }> = {
  ...TECH_ICON_MAP,
  ...PLATFORM_ICON_MAP,
};

function IconBadgeList({ iconBadges }: IconBadgeListProps) {
  return (
    <S.IconBadgeList>
      {iconBadges.map((key) => {
        const data = iconBadgeMap[key.toLowerCase()];
        if (!data) return null;
        return <IconBadge key={key} label={data.label} imgUrl={data.imgUrl} />;
      })}
    </S.IconBadgeList>
  );
}

export default IconBadgeList;
