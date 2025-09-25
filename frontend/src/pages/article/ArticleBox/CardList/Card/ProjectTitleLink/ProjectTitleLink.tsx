import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import * as S from "./ProjectTitleLink.styled";

interface ProjectTitleLinkProps {
  projectTitle: string;
  bgColor: string;
}

const ProjectTitleLink = ({ projectTitle, bgColor }: ProjectTitleLinkProps) => {
  return (
    <S.ProjectTitleLink bgColor={bgColor}>
      {projectTitle}
      <ArrowIcon color={bgColor} direction="right" />
    </S.ProjectTitleLink>
  );
};

export default ProjectTitleLink;
