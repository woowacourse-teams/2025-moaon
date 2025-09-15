import { META_TITLE_PREFIX } from "@domains/constants/meta";
import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import MoveTop from "@shared/components/MoveTop/MoveTop";
import Tab from "@shared/components/Tab/Tab";
import { useMeta } from "@shared/hooks/useMeta";
import ArticleBox from "./ArticleBox/ArticleBox";
import * as S from "./ArticlePage.styled";
import ArticleSearchBar from "./ArticleSearchBar/ArticleSearchBar";
import { useArticleSector } from "./hooks/useArticleCategory";
import useArticleList from "./hooks/useArticleList";

const DEFAULT_ARTICLE_CATEGORY_TYPE = "all";
const ARTICLE_PAGE_DESCRIPTION =
  "프로젝트와 관련된 아티클들을 탐색하고 학습하세요";

function ArticlePage() {
  const { refetch } = useArticleList();
  const { selectedSector, updateSector } = useArticleSector(
    DEFAULT_ARTICLE_CATEGORY_TYPE,
  );

  const articleCategories = ARTICLE_SECTOR_ENTRY.map(([key, { label }]) => ({
    key,
    label,
  }));

  useMeta({
    title: `${META_TITLE_PREFIX}아티클 탐색`,
    description: ARTICLE_PAGE_DESCRIPTION,
  });

  const handleTabSelect = (key: ArticleSectorKey) => {
    updateSector(key);
    refetch();
  };

  return (
    <S.Main>
      <S.MainBox>
        <S.TitleBox>
          <S.MainTitle>아티클 탐색</S.MainTitle>
          <S.MainDescription>{ARTICLE_PAGE_DESCRIPTION}</S.MainDescription>
        </S.TitleBox>
        <ArticleSearchBar />
      </S.MainBox>
      <Tab
        items={articleCategories}
        onSelect={handleTabSelect}
        selected={selectedSector}
      />
      <S.Box>
        <ArticleBox />
      </S.Box>
      <MoveTop />
    </S.Main>
  );
}

export default ArticlePage;
