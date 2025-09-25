import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import * as S from "./ProjectTitle.styled";

interface ProjectTitleProps {
  projectTitle: string;
  color: string;
}

const ProjectTitle = ({ projectTitle, color }: ProjectTitleProps) => {
  return (
    <S.ProjectTitle color={color}>
      {projectTitle}
      <ArrowIcon color={color} direction="right" />
    </S.ProjectTitle>
  );
};

export default ProjectTitle;
