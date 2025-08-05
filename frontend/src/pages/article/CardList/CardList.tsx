import type { Article } from "@/apis/articles/articles.type";
import Card from "./Card/Card";
import * as S from "./CardList.styled";

interface CardListProps {
  articles: Article[];
}

function CardList({ articles }: CardListProps) {
  return (
    <S.CardListContainer>
      {articles.map((article) => (
        <Card key={article.id} article={article} />
      ))}
    </S.CardListContainer>
  );
}

export default CardList;
