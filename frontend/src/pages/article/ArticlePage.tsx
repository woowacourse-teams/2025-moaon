import * as S from "./AticlePage.styled";
import CardList from "./CardList/CardList";
import TagList from "./TagList/TagList";

function ArticlePage() {
  return (
    <S.ArticlePageContainer>
      <CardList />
      <TagList />
    </S.ArticlePageContainer>
  );
}

export default ArticlePage;
