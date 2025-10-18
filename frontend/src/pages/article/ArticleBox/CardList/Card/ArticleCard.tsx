import eyeIcon from "@assets/icons/eye.svg";
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

  const navigate = useNavigate();
  const { postArticleClick } = useArticleClick();
  const { label, color } = ARTICLE_SECTOR_MAP[sector];

  const handleProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (projectId) {
      navigate(`/project/${projectId}`);
    }
  };

  return (
    <S.ArticleLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        postArticleClick(id);
      }}
    >
      <S.CardContainer>
        {projectTitle && (
          // biome-ignore lint/a11y/useSemanticElements: using button role instead
          <S.ProjectLinkButton
            role="button"
            tabIndex={0}
            onClick={handleProjectClick}
            aria-label={`${projectTitle} 프로젝트 페이지로 이동`}
          >
            <ProjectTitle projectTitle={projectTitle} color={color} />
          </S.ProjectLinkButton>
        )}
        <S.CardTitle>{title}</S.CardTitle>
        <S.CardSummary>{summary}</S.CardSummary>
        <S.BadgeList>
          <Badge>{label}</Badge>
          {topics.map((topic) => (
            <Badge key={topic}>{ALL_TOPICS[topic].label}</Badge>
          ))}
        </S.BadgeList>
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
