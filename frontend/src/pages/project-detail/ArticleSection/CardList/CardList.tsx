import { type KeyboardEvent, useRef } from "react";
import type { ProjectArticle } from "@/apis/projectArticles/projectArticles.type";
import ArticleCard from "@/pages/article/ArticleBox/CardList/Card/ArticleCard";
import * as S from "./CardList.styled";

interface CardListProps {
  articles: ProjectArticle[];
}

function CardList({ articles }: CardListProps) {
  const skipButtonRef = useRef<HTMLAnchorElement>(null);

  const handleKeyDownCapture = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "Tab" && e.repeat) {
      e.preventDefault();
      skipButtonRef.current?.focus();
    }
  };

  return (
    <S.CardListContainer onKeyDownCapture={handleKeyDownCapture}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
      <S.SkipToTitleButton
        ref={skipButtonRef}
        href="#project-detail-all-tab-list"
        aria-label="상단 제목으로 이동"
      >
        상단으로 이동
      </S.SkipToTitleButton>
    </S.CardListContainer>
  );
}

export default CardList;
