import { META_TITLE_PREFIX } from "@domains/constants/meta";
import MoveTop from "@shared/components/MoveTop/MoveTop";
import { useMeta } from "@shared/hooks/useMeta";
import { useEffect } from "react";
import { useLocation } from "react-router";
import ArticleBox from "./ArticleBox/ArticleBox";
import * as S from "./ArticlePage.styled";
import ArticleSearchBar from "./ArticleSearchBar/ArticleSearchBar";
import useArticleList from "./hooks/useArticleList";

const ARTICLE_PAGE_DESCRIPTION =
  "프로젝트와 관련된 아티클들을 탐색하고 학습하세요";

function ArticlePage() {
  const { refetch } = useArticleList();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sector = params.get("sector");

  useMeta({
    title: `${META_TITLE_PREFIX}아티클 탐색`,
    description: ARTICLE_PAGE_DESCRIPTION,
  });

  useEffect(() => {
    refetch();
  }, [sector]);

  return (
    <S.Main>
      <S.MainBox>
        <S.TitleBox>
          <S.MainTitle>아티클 탐색</S.MainTitle>
          <S.MainDescription>{ARTICLE_PAGE_DESCRIPTION}</S.MainDescription>
        </S.TitleBox>
        <ArticleSearchBar />
      </S.MainBox>
      <S.Box>
        <ArticleBox />
      </S.Box>
      <MoveTop />
    </S.Main>
  );
}

export default ArticlePage;
