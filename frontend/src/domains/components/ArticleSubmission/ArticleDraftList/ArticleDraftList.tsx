import { ARTICLE_SECTOR_MAP } from "@domains/filter/articleSector";
import CloseIcon from "@shared/components/CloseIcon/CloseIcon";
import type { FormDataType } from "../ArticleForm/ArticleForm";
import * as S from "./ArticleDraftList.styled";

interface ArticleDraftListProps {
  articles: FormDataType[];
  onDelete: (id: string) => void;
}
function ArticleDraftList({ articles, onDelete }: ArticleDraftListProps) {
  const handleDeleteDraft = (id: string) => {
    onDelete(id);
  };
  return (
    <S.ArticleDraftList>
      {articles.reverse().map((article) => {
        const { title, description, sector, id } = article;
        const { color, label } = ARTICLE_SECTOR_MAP[sector];
        return (
          <S.ArticleDraftItem key={id}>
            <S.ArticleDraftHeader>
              <S.ArticleDraftBadge bgColor={color}>{label}</S.ArticleDraftBadge>
              <S.ArticleDraftTitle>{title}</S.ArticleDraftTitle>
            </S.ArticleDraftHeader>
            <S.ArticleDraftDescription>{description}</S.ArticleDraftDescription>
            <S.CloseButton type="button" onClick={() => handleDeleteDraft(id)}>
              <CloseIcon />
            </S.CloseButton>
          </S.ArticleDraftItem>
        );
      })}
    </S.ArticleDraftList>
  );
}

export default ArticleDraftList;
