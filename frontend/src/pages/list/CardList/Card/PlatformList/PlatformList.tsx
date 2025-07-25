import { PLATFORM_ICON_MAP, type PlatformKey } from "@domains/filter/platform";
import Platform from "./Platform/Platform";
import * as S from "./PlatformList.styled";

interface PlatformListProps {
  platforms: PlatformKey[];
}

function PlatformList({ platforms }: PlatformListProps) {
  return (
    <S.PlatformList>
      {platforms.map((platform) => (
        <Platform key={platform} imgUrl={PLATFORM_ICON_MAP[platform].imgUrl} />
      ))}
    </S.PlatformList>
  );
}

export default PlatformList;
