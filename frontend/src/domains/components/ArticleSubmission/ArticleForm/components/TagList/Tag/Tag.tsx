import * as S from "./Tag.styled";

interface TagProps {
  title: string;
  isActive: boolean;
  imgUrl?: string;
  onClick?: () => void;
}

function Tag({ title, isActive, imgUrl, onClick }: TagProps) {
  return (
    <S.Tag>
      <S.TagButton type="button" isActive={isActive} onClick={onClick}>
        {imgUrl && <S.TagIcon src={imgUrl} alt={title} />}
        {title}
      </S.TagButton>
    </S.Tag>
  );
}

export default Tag;
