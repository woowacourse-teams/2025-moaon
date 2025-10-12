import { useCallback, useState } from "react";
import type { FormDataType } from "../types";

interface useArticleSubmissionProps {
  initialArticles: FormDataType[];
  projectId?: number;
}

interface UseArticleSubmissionReturn {
  articles: FormDataType[];
  editingArticle: FormDataType | null;
  addArticle: (article: FormDataType) => void;
  deleteArticle: (id: string) => void;
  startEdit: (article: FormDataType) => void;
  updateArticle: (updated: FormDataType) => void;
  cancelEdit: () => void;
  postArticlesClick: () => void;
}

export const useArticleSubmission = ({
  initialArticles,
  projectId,
}: useArticleSubmissionProps): UseArticleSubmissionReturn => {
  const [articles, setArticles] = useState<FormDataType[]>(initialArticles);
  const [editingArticle, setEditingArticle] = useState<FormDataType | null>(
    null
  );

  const addArticle = useCallback((article: FormDataType) => {
    setArticles((prev) => [...prev, article]);
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setArticles((prev) => prev.filter((item) => item.id !== id));
    setEditingArticle((current) => (current?.id === id ? null : current));
  }, []);

  const startEdit = useCallback((article: FormDataType) => {
    setEditingArticle(article);
  }, []);

  const updateArticle = useCallback((updatedData: FormDataType) => {
    setArticles((prev) =>
      prev.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
    setEditingArticle(null);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingArticle(null);
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
