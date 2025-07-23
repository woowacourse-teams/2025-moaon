import * as S from "./Platform.styled";

interface PlatformProps {
  imgUrl: string;
}

function Platform({ imgUrl }: PlatformProps) {
  return (
    <S.Platform>
      <S.PlatformIcon src={imgUrl} alt="" />
    </S.Platform>
  );
}

export default Platform;
