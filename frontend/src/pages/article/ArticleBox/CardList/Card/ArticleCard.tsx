import eyeIcon from "@assets/icons/eye.svg";
import redHeartIcon from "@assets/icons/pink-heart.svg";
import { ARTICLE_SECTOR_MAP } from "@domains/filter/articleSector";
import { ALL_TOPICS } from "@domains/filter/articleTopic";
import { useNavigate } from "react-router";
import type { Article } from "@/apis/articles/articles.type";
import type { ProjectArticle } from "@/apis/projectArticles/projectArticles.type";
import TechStackList from "@/pages/project-list/CardList/Card/TechStackList/TechStackList";
import * as S from "./ArticleCard.styled";
import Badge from "./Badge/Badge";
import useArticleClick from "./hooks/useArticleClick";
import ProjectTitle from "./ProjectTitle/ProjectTitleLink";

interface CardProps {
  article: Article | ProjectArticle;
}

const isArticle = (article: Article | ProjectArticle): article is Article => {
  return (article as Article).projectId !== undefined;
};

const getProjectInfo = (article: Article | ProjectArticle) => {
  if (isArticle(article)) {
    return {
      projectId: article.projectId,
      projectTitle: article.projectTitle,
    };
  }
  return {
    projectId: null,
    projectTitle: null,
  };
};

function ArticleCard({ article }: CardProps) {
  const { title, summary, techStacks, url, sector, clicks, id, topics } =
    article;
  const { projectId, projectTitle } = getProjectInfo(article);

  const { postArticleClick } = useArticleClick();
  const { label, bgColor } = ARTICLE_SECTOR_MAP[sector];

  const navigate = useNavigate();

  return (
    <S.ArticleLink
      onClick={() => {
        postArticleClick(id);
        window.open(url, "_blank", "noopener,noreferrer");
      }}
    >
      <S.CardContainer>
        {projectTitle && (
          <S.ProjectLink
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/project/${projectId}`);
            }}
          >
            <ProjectTitle projectTitle={projectTitle} bgColor={bgColor} />
          </S.ProjectLink>
        )}
        <S.CardTitle>{title}</S.CardTitle>
        <S.CardSummary>{summary}</S.CardSummary>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Badge>{label}</Badge>
          {topics.map((topic) => (
            <Badge key={topic}>{ALL_TOPICS[topic].label}</Badge>
          ))}
        </div>
        <S.CardInfoBox>
          <TechStackList techStacks={techStacks} />
          <S.CardClickBox>
            <S.CardClickIcon src={eyeIcon} alt="클릭 수 아이콘" />
            <S.CardClickCount>
              {clicks > 999 ? "999+" : clicks}
            </S.CardClickCount>
          </S.CardClickBox>
        </S.CardInfoBox>
      </S.CardContainer>
    </S.ArticleLink>
  );
}

export default ArticleCard;
