import { useParams } from "react-router";
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

  return (
    <S.ArticleSubmissionContainer>
      <ArticleForm
        onSubmit={addArticle}
        editingData={editingArticle ?? undefined}
        onUpdate={updateArticle}
        onCancel={cancelEdit}
      />
      {articles.length > 0 && (
        <>
          <ArticleDraftList
            articles={articles}
            onDelete={deleteArticle}
            onEdit={startEdit}
          />
          <S.ArticleSubmissionButton type="button" onClick={postArticlesClick}>
            아티클 등록
          </S.ArticleSubmissionButton>
        </>
      )}
    </S.ArticleSubmissionContainer>
  );
}

export default ArticleSubmission;
