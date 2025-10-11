import { ARTICLE_SECTOR_MAP } from "@domains/filter/articleSector";
import CloseIcon from "@shared/components/CloseIcon/CloseIcon";
import type { FormDataType } from "../ArticleForm/ArticleForm";
import * as S from "./ArticleDraftList.styled";

interface ArticleDraftListProps {
  articles: FormDataType[];
  onDelete: (id: string) => void;
  // 추가: 아티클을 선택(수정)할 때 호출되는 콜백
  onEdit: (article: FormDataType) => void;
}
function ArticleDraftList({
  articles,
  onDelete,
  onEdit,
}: ArticleDraftListProps) {
  const handleDeleteDraft = (id: string) => {
    onDelete(id);
  };
  // 추가: 수정 모드로 전환할 때 호출
  const handleEditDraft = (article: FormDataType) => {
    onEdit(article);
  };
  return (
    <S.ArticleDraftList>
      {/* 변경: 원본 배열 변경 방지 위해 복사 후 reverse */}
      {[...articles].reverse().map((article) => {
        const { title, description, sector, id } = article;
        const { color, label } = ARTICLE_SECTOR_MAP[sector];
        return (
          // 변경: 카드 클릭 시 수정 핸들러 호출
          <S.ArticleDraftItem
            key={id}
            onClick={() => handleEditDraft(article)}
            tabIndex={0}
          >
            <S.ArticleDraftHeader>
              <S.ArticleDraftBadge bgColor={color}>{label}</S.ArticleDraftBadge>
              <S.ArticleDraftTitle>{title}</S.ArticleDraftTitle>
            </S.ArticleDraftHeader>
            <S.ArticleDraftDescription>{description}</S.ArticleDraftDescription>
            {/* 변경: 삭제 버튼 클릭 시 이벤트 전파 차단 */}
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
      })}
    </S.ArticleDraftList>
  );
}

export default ArticleDraftList;
