import eyeIcon from "@assets/icons/eye.svg";
import OutgoingLinkIcon from "@assets/icons/outgoing-link.svg";
import { ARTICLE_SECTOR_MAP } from "@domains/filter/articleSector";
import type { Article } from "@/apis/articles/articles.type";
import type { ProjectArticle } from "@/apis/projectArticles/projectArticles.type";
import useArticleClick from "@/pages/article/hooks/useArticleClick";
import TechStackList from "@/pages/project-list/CardList/Card/TechStackList/TechStackList";
import * as S from "./ArticleCard.styled";
import Badge from "./Badge/Badge";

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
  const { title, summary, techStacks, url, sector, clicks, id } = article;

  const isArticleList = isArticle(article);
  const { projectId, projectTitle } = getProjectInfo(article);

  const { postArticleClick } = useArticleClick();
  const { label, bgColor } = ARTICLE_SECTOR_MAP[sector];
  return (
    <S.CardContainer>
      <Badge bgColor={bgColor}>
        {isArticleList ? (
          <>
            {projectTitle} <S.ArrowText>&gt;</S.ArrowText> {label}
          </>
        ) : (
          label
        )}
      </Badge>
      <S.CardTitle>{title}</S.CardTitle>
      <S.CardSummary>{summary}</S.CardSummary>
      <S.CardInfoBox>
        <TechStackList techStacks={techStacks} />
        <S.CardClickBox>
          <S.CardClickIcon src={eyeIcon} alt="클릭 수 아이콘" />
          <S.CardClickCount>{clicks > 999 ? "999+" : clicks}</S.CardClickCount>
        </S.CardClickBox>
      </S.CardInfoBox>
      <S.BackDropBox className="back-drop-box">
        <S.ArticleLink
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => postArticleClick(id)}
        >
          아티클 <img src={OutgoingLinkIcon} alt="아웃고잉 링크 아이콘" />
        </S.ArticleLink>
        {isArticleList && (
          <S.ProjectLink to={`/project/${projectId}`}>
            프로젝트 <img src={OutgoingLinkIcon} alt="아웃고잉 링크 아이콘" />
          </S.ProjectLink>
        )}
      </S.BackDropBox>
    </S.CardContainer>
  );
}

export default ArticleCard;
