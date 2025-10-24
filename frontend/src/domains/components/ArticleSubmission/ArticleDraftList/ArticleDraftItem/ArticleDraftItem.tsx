import DeleteButtonIcon from "@shared/components/DeleteButtonIcon/DeleteButtonIcon";
import EditButtonIcon from "@shared/components/EditButtonIcon/EditButtonIcon";
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
  const { title, description, id } = article;

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
      <S.ArticleDraftHeader>
        <S.ArticleDraftTitle>{title}</S.ArticleDraftTitle>
      </S.ArticleDraftHeader>
      <S.ArticleDraftDescription>{description}</S.ArticleDraftDescription>
      <S.CloseButtonBox>
        <EditButtonIcon onClick={() => handleEditDraft(article)} />
        <DeleteButtonIcon onClick={() => handleDeleteDraft(id)} />
      </S.CloseButtonBox>
    </S.ArticleDraftItem>
  );
}

export default ArticleDraftItem;
