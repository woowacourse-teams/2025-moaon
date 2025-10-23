import { toast } from "@shared/components/Toast/toast";
import { useNavigate } from "react-router";
import ArticleDraftItem from "./ArticleDraftList/ArticleDraftItem/ArticleDraftItem";
import ArticleDraftList from "./ArticleDraftList/ArticleDraftList";
import ArticleForm from "./ArticleForm/ArticleForm";
import * as S from "./ArticleSubmission.styled";
import { useArticleSubmission } from "./hooks/useArticleSubmission";
import type { ArticleFormDataType } from "./types";

interface ArticleSubmissionProps {
  projectId: number;
  initialArticles?: ArticleFormDataType[];
}

function ArticleSubmission({
  projectId,
  initialArticles,
}: ArticleSubmissionProps) {
  const navigate = useNavigate();
  const {
    articles,
    editingArticle,
    addArticle,
    deleteArticle,
    startEdit,
    updateArticle,
    cancelEdit,
    postArticlesClick,
  } = useArticleSubmission({
    initialArticles: initialArticles ?? [],
    projectId,
  });

  const postArticleAndNavigate = async () => {
    try {
      await postArticlesClick();
      toast.success("아티클이 성공적으로 등록되었어요!");
      navigate(`/project/${projectId}`);
    } catch {
      toast.error("아티클 등록에 실패했습니다.");
    }
  };

  return (
    <S.ArticleSubmissionContainer>
      <ArticleForm
        onSubmit={addArticle}
        editingData={editingArticle}
        onUpdate={updateArticle}
        onCancel={cancelEdit}
      />
      {articles.length > 0 && (
        <>
          <ArticleDraftList>
            {[...articles].map((article) => (
              <ArticleDraftItem
                key={article.id}
                onEdit={startEdit}
                article={article}
                onDelete={deleteArticle}
              />
            ))}
          </ArticleDraftList>
          {editingArticle === undefined && (
            <S.ArticleSubmissionButton
              type="button"
              onClick={postArticleAndNavigate}
              disabled={editingArticle !== undefined}
            >
              아티클 등록
            </S.ArticleSubmissionButton>
          )}
        </>
      )}
    </S.ArticleSubmissionContainer>
  );
}

export default ArticleSubmission;
