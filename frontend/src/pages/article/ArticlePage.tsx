import {
  ARTICLE_CATEGORY_ENTRY,
  type ArticleCategoryKey,
} from "@domains/filter/articleCategory";
import { ARTICLE_SORT_MAP } from "@domains/sort/article";
import Tab from "@shared/components/Tab/Tab";
import useSearchParams from "@shared/hooks/useSearchParams";
import SortList from "../../domains/components/SortList/SortList";
import ArticleSearchBar from "./ArticleSearchBar/ArticleSearchBar";
import * as S from "./AticlePage.styled";
import CardList from "./CardList/CardList";
import useArticleList from "./hooks/useArticleList";
import TagList from "./TagList/TagList";

const DEFAULT_SORT_TYPE = "createdAt";
const DEFAULT_FILTER_TYPE = "all";

function ArticlePage() {
  const { refetch, isLoading, articles } = useArticleList();

  const categoryParams = useSearchParams({
    key: "category",
    mode: "single",
  });

  const rawSelectedCategory = categoryParams.get()[0];
  const selectedCategory = (rawSelectedCategory ??
    DEFAULT_FILTER_TYPE) as ArticleCategoryKey;

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
    categoryParams.update(key);
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
