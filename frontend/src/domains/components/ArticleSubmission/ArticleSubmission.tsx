import ArticleDraftList from "./ArticleDraftList/ArticleDraftList";
import ArticleForm from "./ArticleForm/ArticleForm";
import * as S from "./ArticleSubmission.styled";
import { useArticleSubmission } from "./hooks/useArticleSubmission";
import type { FormDataType } from "./types";

interface ArticleSubmissionProps {
  projectId?: string;
  initialArticles?: FormDataType[];
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
  } = useArticleSubmission({ initialArticles: initialArticles ?? [] });

  return (
    <S.ArticleSubmissionContainer>
      <ArticleForm
        onFormSubmit={addArticle}
        initialData={editingArticle ?? undefined}
        onUpdate={updateArticle}
        onCancel={cancelEdit}
      />
      {articles.length > 0 && (
        <ArticleDraftList
          articles={articles}
          onDelete={deleteArticle}
          onEdit={startEdit}
        />
      )}
      <S.ArticleSubmissionButton type="button" onClick={() => {}}>
        아티클 등록
      </S.ArticleSubmissionButton>
    </S.ArticleSubmissionContainer>
  );
}

export default ArticleSubmission;
