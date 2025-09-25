import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import * as S from "./ProjectTitle.styled";

interface ProjectTitleProps {
  projectTitle: string;
  bgColor: string;
}

const ProjectTitle = ({ projectTitle, bgColor }: ProjectTitleProps) => {
  return (
    <S.ProjectTitle bgColor={bgColor}>
      {projectTitle}
      <ArrowIcon color={bgColor} direction="right" />
    </S.ProjectTitle>
  );
};

export default ProjectTitle;
