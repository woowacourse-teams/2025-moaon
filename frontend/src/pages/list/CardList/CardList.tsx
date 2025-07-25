import useProjectList from "../hooks/useProjectList";
import Card from "./Card/Card";
import * as S from "./CardList.styled";
import useProjectList from "./hooks/useProjectList";

function CardList() {
  const { projects, isLoading } = useProjectList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <S.CardList>
      {projects?.map((project) => (
        <Card key={project.id} project={project} />
      ))}
    </S.CardList>
  );
}

export default CardList;
