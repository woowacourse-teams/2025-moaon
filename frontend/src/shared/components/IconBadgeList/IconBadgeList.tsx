import { ICON_BADGE_MAP } from "@domains/filter/filter.constants";
import type { IconBadgeKeys } from "@domains/filter/filter.type";
import IconBadge from "./IconBadge/IconBadge";
import * as S from "./IconBadgeList.styled";

interface IconBadgeListProps {
  iconBadges: IconBadgeKeys;
}

function IconBadgeList({ iconBadges }: IconBadgeListProps) {
  return (
    <S.IconBadgeList>
      {iconBadges.map((key) => {
        const { label, imgUrl } = ICON_BADGE_MAP[key];
        return <IconBadge key={key} label={label} imgUrl={imgUrl} />;
      })}
    </S.IconBadgeList>
  );
}

export default IconBadgeList;
