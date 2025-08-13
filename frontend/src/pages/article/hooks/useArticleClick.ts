import { useMutation } from "@tanstack/react-query";
import { articlesQueries } from "@/apis/articles/articles.queries";

const useArticleClick = () => {
  const postArticleClickMutation = useMutation(articlesQueries.postArticleClick());

  const postArticleClick = (id: number) => {
    postArticleClickMutation.mutate(id);
  };

  return {
    postArticleClick,
  };
};

export default useArticleClick;
