import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { articlesQueries } from "@/apis/articles/articles.queries";
import type { ArticleFormDataType } from "../types";

interface UseArticleSubmissionProps {
  initialArticles: ArticleFormDataType[];
  projectId: number;
}

export const useArticleSubmission = ({
  initialArticles,
  projectId,
}: UseArticleSubmissionProps) => {
  const [articles, setArticles] =
    useState<ArticleFormDataType[]>(initialArticles);
  const [editingArticle, setEditingArticle] = useState<
    ArticleFormDataType | undefined
  >(undefined);

  const addArticle = useCallback((article: ArticleFormDataType) => {
    setArticles((prev) => [article, ...prev]);
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setArticles((prev) => prev.filter((item) => item.id !== id));
    setEditingArticle((current) => (current?.id === id ? undefined : current));
  }, []);

  const startEdit = useCallback((article: ArticleFormDataType) => {
    setEditingArticle(article);
  }, []);

  const updateArticle = useCallback((updatedData: ArticleFormDataType) => {
    setArticles((prev) =>
      prev.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
    setEditingArticle(undefined);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingArticle(undefined);
  }, []);

  const { mutateAsync: postArticlesMutation } = useMutation(
    articlesQueries.postArticles()
  );

  const postArticlesClick = useCallback(async () => {
    await postArticlesMutation(
      articles.map((article) => ({
        projectId,
        title: article.title,
        summary: article.description,
        techStacks: article.sector.techStacks,
        url: article.address,
        sector: article.sector.value,
        topics: article.sector.topics,
      }))
    );
  }, [projectId, articles, postArticlesMutation]);

  return {
    articles,
    editingArticle,
    addArticle,
    deleteArticle,
    startEdit,
    updateArticle,
    cancelEdit,
    postArticlesClick,
  };
};
