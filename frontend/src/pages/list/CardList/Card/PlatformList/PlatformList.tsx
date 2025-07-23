import Platform from "./Platform/Platform";
import * as S from "./PlatformList.styled";

interface PlatformListProps {
  platforms: string[];
}

function PlatformList({ platforms }: PlatformListProps) {
  return (
    <S.PlatformList>
      {platforms.map((platform) => (
        <Platform
          key={platform}
          imgUrl="https://icon.icepanel.io/Technology/svg/Apple.svg"
        />
      ))}
    </S.PlatformList>
  );
}

export default PlatformList;
