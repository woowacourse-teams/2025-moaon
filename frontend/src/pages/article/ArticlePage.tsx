import {
  ARTICLE_CATEGORY_ENTRY,
  type ArticleCategoryKey,
} from "@domains/filter/articleCategory";
import MoveTop from "@shared/components/MoveTop/MoveTop";
import Tab from "@shared/components/Tab/Tab";
import ArticleBox from "./ArticleBox/ArticleBox";
import * as S from "./ArticlePage.styled";
import ArticleSearchBar from "./ArticleSearchBar/ArticleSearchBar";
import { useArticleCategory } from "./hooks/useArticleCategory";
import useArticleList from "./hooks/useArticleList";
import TagList from "./TagList/TagList";

const DEFAULT_ARTICLE_CATEGORY_TYPE = "all";

function ArticlePage() {
  const { refetch } = useArticleList();
  const { selectedCategory, updateCategory } = useArticleCategory(
    DEFAULT_ARTICLE_CATEGORY_TYPE,
  );

  const articleCategories = ARTICLE_CATEGORY_ENTRY.map(([key, { label }]) => ({
    key,
    label,
  }));

  const handleTabSelect = (key: ArticleCategoryKey) => {
    updateCategory(key);
    refetch();
  };

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
      <Tab
        items={articleCategories}
        onSelect={handleTabSelect}
        selected={selectedCategory}
      />
      <S.Box>
        <ArticleBox />
        <TagList />
      </S.Box>
      <MoveTop />
    </S.Main>
  );
}

export default ArticlePage;
