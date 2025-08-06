import {
  ARTICLE_CATEGORY_ENTRY,
  type ArticleCategoryKey,
} from "@domains/filter/articleCategory";
import { ARTICLE_SORT_MAP } from "@domains/sort/article";
import Tab from "@shared/components/Tab/Tab";
import SortList from "../../domains/components/SortList/SortList";
import * as S from "./ArticlePage.styled";
import ArticleSearchBar from "./ArticleSearchBar/ArticleSearchBar";
import CardList from "./CardList/CardList";
import { useArticleCategory } from "./hooks/useArticleCategory";
import useArticleList from "./hooks/useArticleList";
import TagList from "./TagList/TagList";

const DEFAULT_SORT_TYPE = "createdAt";
const DEFAULT_ARTICLE_CATEGORY_TYPE = "all";

function ArticlePage() {
  const { refetch, isLoading, articles } = useArticleList();
  const { selectedCategory, updateCategory } = useArticleCategory(
    DEFAULT_ARTICLE_CATEGORY_TYPE,
  );

  const articleCategories = ARTICLE_CATEGORY_ENTRY.map(([key, { label }]) => ({
    key,
    label,
  }));

  if (isLoading) return <div>Loading...</div>;
  if (!articles) return <div>No articles found</div>;

  const { articleContents, totalCount } = articles;

  const handleSelect = () => {
    refetch();
  };

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
        <S.ArticleContainer>
          <S.ArticleHeader>
            <S.ArticleIntro>
              <S.ArticleIntroText>{totalCount}개</S.ArticleIntroText>의 아티클이
              모여있어요.
            </S.ArticleIntro>
            <SortList<typeof ARTICLE_SORT_MAP>
              sortMap={ARTICLE_SORT_MAP}
              onSelect={handleSelect}
              initialValue={DEFAULT_SORT_TYPE}
            />
          </S.ArticleHeader>
          <CardList articles={articleContents} />
        </S.ArticleContainer>
        <TagList />
      </S.Box>
    </S.Main>
  );
}

export default ArticlePage;
