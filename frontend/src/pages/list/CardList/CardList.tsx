import Card from "./Card/Card";
import * as S from "./CardList.styled";
import useProjectList from "./hooks/useProjectList";

function CardList() {
  const { projects } = useProjectList();

  return (
    <S.CardList>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </S.CardList>
  );
}

export default CardList;
