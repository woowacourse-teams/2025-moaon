import type { ProjectArticle } from "@/apis/projectArticles/projectArticles.type";
import ArticleCard from "@/pages/article/ArticleBox/CardList/Card/ArticleCard";
import * as S from "./CardList.styled";

interface CardListProps {
  articles: ProjectArticle[];
}

function CardList({ articles }: CardListProps) {
  return (
    <S.CardListContainer>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </S.CardListContainer>
  );
}

export default CardList;
