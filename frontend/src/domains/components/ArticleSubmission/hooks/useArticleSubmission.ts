import { useCallback, useState } from "react";
import type { ArticleFormDataType } from "../types";

interface UseArticleSubmissionProps {
  initialArticles: ArticleFormDataType[];
  projectId?: number;
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

  const postArticlesClick = useCallback(() => {
    /**
     * 아티클 등록 API가 나올 시 연동할 예정입니다.
     */
    console.log(projectId, articles);
  }, [projectId, articles]);

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
