import { ARTICLE_CATEGORY_MAP } from "@domains/filter/articleCategory";
import type { Article } from "@/apis/articles/articles.type";
import TechStackList from "@/pages/project-list/CardList/Card/TechStackList/TechStackList";
import Badge from "./Badge/Badge";
import * as S from "./Card.styled";

interface CardProps {
  article: Article;
}

function Card({ article }: CardProps) {
  const { title, summary, techStacks, url, category, projectId } = article;
  const isArticleList = projectId;
  const { label, bgColor } = ARTICLE_CATEGORY_MAP[category];  const isArticleList = projectId;

  return (
    <S.CardContainer>
      <Badge text={label} bgColor={bgColor} />
      <S.CardTitle>{title}</S.CardTitle>
      <S.CardSummary>{summary}</S.CardSummary>
      <TechStackList techStacks={techStacks} />
      <S.BackDropBox className="back-drop-box">
        <S.ArticleLink href={url} target="_blank" rel="noopener noreferrer">
          아티클 보러가기
        </S.ArticleLink>
        {isArticleList && (
          <S.ProjectLink to={`/project/${projectId}`}>
            프로젝트 보러가기
          </S.ProjectLink>
        )}
      </S.BackDropBox>
    </S.CardContainer>
  );
}

export default Card;
