import ArticleSearchBar from "./ArticleSearchBar/ArticleSearchBar";
import * as S from "./AticlePage.styled";
import CardList from "./CardList/CardList";
import TagList from "./TagList/TagList";

function ArticlePage() {
  return (
    <S.Main>
      <S.MainBox>
        <S.TitleBox>
          <S.MainTitle>프로젝트 탐색</S.MainTitle>
          <S.MainDescription>
            다양한 개발자들의 프로젝트를 탐색하고 학습하세요
          </S.MainDescription>
        </S.TitleBox>
        <ArticleSearchBar />
      </S.MainBox>
      <CardList />
      <TagList />
    </S.Main>
  );
}

export default ArticlePage;
