import { useState } from "react";
import ArticleDraftList from "./ArticleDraftList/ArticleDraftList";
import ArticleForm, { type FormDataType } from "./ArticleForm/ArticleForm";
import * as S from "./ArticleSubmission.styled";

function ArticleSubmission() {
  const [articles, setArticles] = useState<FormDataType[]>([
    {
      id: crypto.randomUUID(),
      address: "https://example.com",
      title: "Example Article",
      description: "This is an example article description.",
      sector: "fe",
      topic: ["etc"],
      techStack: ["react", "pwa"],
    },
  ]);

  const [editingArticle, setEditingArticle] = useState<FormDataType | null>(
    null,
  );

  const addArticlesClick = (article: FormDataType) => {
    setArticles((prev) => [...prev, article]);
  };
  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((item) => item.id !== id));
  };
  const handleEdit = (article: FormDataType) => {
    setEditingArticle(article);
  };
  const handleUpdate = (updated: FormDataType) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setEditingArticle(null);
  };
  const handleCancelEdit = () => {
    setEditingArticle(null);
  };
  return (
    <S.ArticleSubmissionContainer>
      <ArticleForm
        onFormSubmit={addArticlesClick}
        initialData={editingArticle ?? undefined}
        onUpdate={handleUpdate}
        onCancel={handleCancelEdit}
      />
      <ArticleDraftList
        articles={articles}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </S.ArticleSubmissionContainer>
  );
}

export default ArticleSubmission;
