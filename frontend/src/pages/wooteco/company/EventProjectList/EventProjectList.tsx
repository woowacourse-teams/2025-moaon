import type { ProjectCard } from "@/apis/projects/projects.type";
import Card from "@/pages/project-list/CardList/Card/Card";
import * as S from "./EventProjectList.styled";

interface EventProjectListProps {
  projects: ProjectCard[];
}

function EventProjectList({ projects }: EventProjectListProps) {
  return (
    <S.List>
      {projects.map((project) => (
        <Card key={project.id} project={project} />
      ))}
    </S.List>
  );
}

export default EventProjectList;
