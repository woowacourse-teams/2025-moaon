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
      sector: "nonTech",
      topic: ["culture"],
      techStack: ["react"],
    },
  ]);
  const addArticlesClick = (article: FormDataType) => {
    setArticles((prev) => [...prev, article]);
  };
  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <S.ArticleSubmissionContainer>
      <ArticleForm onFormSubmit={addArticlesClick} />
      <ArticleDraftList articles={articles} onDelete={handleDelete} />
    </S.ArticleSubmissionContainer>
  );
}

export default ArticleSubmission;
