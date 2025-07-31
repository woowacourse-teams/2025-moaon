import { ICON_BADGE_MAP, type IconBadgeKeys } from "@domains/filter/iconBadge";
import IconBadge from "./IconBadge/IconBadge";
import * as S from "./IconBadgeList.styled";

interface IconBadgeListProps {
  iconBadges: IconBadgeKeys;
}

function IconBadgeList({ iconBadges }: IconBadgeListProps) {
  return (
    <S.IconBadgeList>
      {iconBadges.map((key) => {
        const { label, imgUrl, color } = ICON_BADGE_MAP[key];
        return (
          <IconBadge key={key} label={label} imgUrl={imgUrl} color={color} />
        );
      })}
    </S.IconBadgeList>
  );
}

export default IconBadgeList;
