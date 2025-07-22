import * as S from "./IconBadge.styled";

interface IconBadgeProps {
  label: string;
  imgUrl: string;
}

function IconBadge({ label, imgUrl }: IconBadgeProps) {
  return (
    <S.IconBadge>
      <img src={imgUrl} alt="label" width={24} />
      {label}
    </S.IconBadge>
  );
}

export default IconBadge;
