import Card from "./Card/Card";
import * as S from "./CardList.styled";

function CardList() {
  return (
    <S.CardListContainer>
      <Card />
      <Card />
      <Card />
      <Card />
    </S.CardListContainer>
  );
}

export default CardList;
