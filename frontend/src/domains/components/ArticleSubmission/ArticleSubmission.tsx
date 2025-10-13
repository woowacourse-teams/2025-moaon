import { useParams } from "react-router";
import ArticleDraftList from "./ArticleDraftList/ArticleDraftList";
import ArticleForm from "./ArticleForm/ArticleForm";
import * as S from "./ArticleSubmission.styled";
import { useArticleSubmission } from "./hooks/useArticleSubmission";
import type { FormDataType } from "./types";

interface ArticleSubmissionProps {
  id?: number;
  initialArticles?: FormDataType[];
}

function ArticleSubmission({
  id: propsId,
  initialArticles,
}: ArticleSubmissionProps) {
  const { id: urlId } = useParams();
  const projectId = propsId ?? Number(urlId);

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
        onFormSubmit={addArticle}
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
