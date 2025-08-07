import { ARTICLE_CATEGORY_MAP } from "@domains/filter/articleCategory";
import type { Article } from "@/apis/articles/articles.type";
import useArticleList from "@/pages/article/hooks/useArticleList";
import TechStackList from "@/pages/project-list/CardList/Card/TechStackList/TechStackList";
import Badge from "./Badge/Badge";
import * as S from "./Card.styled";

interface CardProps {
  article: Article;
}

function Card({ article }: CardProps) {
  const { postArticleClick } = useArticleList();
  const { title, summary, techStacks, url, category, projectId } = article;
  const { label, bgColor } = ARTICLE_CATEGORY_MAP[category];

  return (
    <S.CardContainer>
      {article.clicks}
      <Badge text={label} bgColor={bgColor} />
      <S.CardTitle>{title}</S.CardTitle>
      <S.CardSummary>{summary}</S.CardSummary>
      <TechStackList techStacks={techStacks} />
      <S.BackDropBox className="back-drop-box">
        <S.ArticleLink
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => postArticleClick(article.id)}
        >
          아티클 보러가기
        </S.ArticleLink>
        <S.ProjectLink to={`/project/${projectId}`}>
          프로젝트 보러가기
        </S.ProjectLink>
      </S.BackDropBox>
    </S.CardContainer>
  );
}

export default Card;
