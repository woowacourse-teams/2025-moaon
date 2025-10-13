import { ARTICLE_SECTOR_MAP } from "@domains/filter/articleSector";
import CloseIcon from "@shared/components/CloseIcon/CloseIcon";
import type { ArticleFormDataType } from "../../types";
import * as S from "./ArticleDraftItem.styled";

interface ArticleDraftItemProps {
  article: ArticleFormDataType;
  onDelete: (id: string) => void;
  onEdit: (article: ArticleFormDataType) => void;
}

function ArticleDraftItem({
  onDelete,
  onEdit,
  article,
}: ArticleDraftItemProps) {
  const { title, description, sector, id } = article;
  const { color, label } = ARTICLE_SECTOR_MAP[sector];
  const handleDeleteDraft = (id: string) => {
    const confirmDelete = window.confirm("해당 아티클을 삭제하시겠습니까?");
    if (confirmDelete) {
      onDelete(id);
    }
  };
  const handleEditDraft = (article: ArticleFormDataType) => {
    onEdit(article);
  };
  return (
    <S.ArticleDraftItem>
      <S.ArticleDraftItemDetailButton
        type="button"
        onClick={() => handleEditDraft(article)}
      >
        수정하기
      </S.ArticleDraftItemDetailButton>
      <S.ArticleDraftHeader>
        <S.ArticleDraftBadge bgColor={color}>{label}</S.ArticleDraftBadge>
        <S.ArticleDraftTitle>{title}</S.ArticleDraftTitle>
      </S.ArticleDraftHeader>
      <S.ArticleDraftDescription>{description}</S.ArticleDraftDescription>
      <S.CloseButton
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteDraft(id);
        }}
      >
        <CloseIcon />
      </S.CloseButton>
    </S.ArticleDraftItem>
  );
}

export default ArticleDraftItem;
