import { ARTICLE_CATEGORY_MAP } from "@domains/filter/articleCategory";
import { ARTICLE_SORT_MAP } from "@domains/sort/article";
import Tab from "@shared/components/Tab/Tab";
import SortList from "../../domains/components/SortList/SortList";
import ArticleSearchBar from "./ArticleSearchBar/ArticleSearchBar";
import * as S from "./AticlePage.styled";
import CardList from "./CardList/CardList";
import useArticleList from "./hooks/useArticleList";
import TagList from "./TagList/TagList";

function ArticlePage() {
  const { isLoading, articles } = useArticleList();
  const articleCategoryLabels = Object.values(ARTICLE_CATEGORY_MAP).map(
    (item) => item.label,
  );

  if (isLoading) return <div>Loading...</div>;
  if (!articles) return <div>No articles found</div>;

  return (
    <S.Main>
      <S.MainBox>
        <S.TitleBox>
          <S.MainTitle>아티클 탐색</S.MainTitle>
          <S.MainDescription>
            프로젝트와 관련된 아티클들을 탐색하고 학습하세요
          </S.MainDescription>
        </S.TitleBox>
        <ArticleSearchBar />
      </S.MainBox>
      <Tab items={articleCategoryLabels} />
      <S.Box>
        <S.ArticleContainer>
          <S.ArticleHeader>
            <S.ArticleIntro>
              <S.ArticleIntroText>{articles.totalCount}개</S.ArticleIntroText>의
              아티클이 모여있어요.
            </S.ArticleIntro>
            <SortList sortMap={ARTICLE_SORT_MAP} />
          </S.ArticleHeader>
          <CardList articles={articles.articleContents} />
        </S.ArticleContainer>
        <TagList />
      </S.Box>
    </S.Main>
  );
}

export default ArticlePage;
