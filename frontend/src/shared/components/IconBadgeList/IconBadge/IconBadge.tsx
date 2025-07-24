import * as S from "./IconBadge.styled";

interface IconBadgeProps {
  label: string;
  imgUrl: string;
}

function IconBadge({ label, imgUrl }: IconBadgeProps) {
  return (
    <S.IconBadge>
      {imgUrl && <S.Icon src={imgUrl} alt={label} />}
      {label}
    </S.IconBadge>
  );
}

export default IconBadge;
