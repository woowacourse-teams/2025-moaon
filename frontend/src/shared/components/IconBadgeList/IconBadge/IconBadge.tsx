import * as S from "./IconBadge.styled";

interface IconBadgeProps {
  label: string;
  imgUrl: string;
  iconsSize?: number;
  fontSize?: number;
}

function IconBadge({
  label,
  imgUrl,
  fontSize = 16,
  iconsSize = 20,
}: IconBadgeProps) {
  return (
    <S.IconBadge $fontSize={fontSize}>
      {imgUrl && <S.Icon src={imgUrl} alt={label} iconsSize={iconsSize} />}
      {label}
    </S.IconBadge>
  );
}

export default IconBadge;
