import heartIcon from "@assets/icons/heart.svg";
import emptyHeartIcon from "@assets/icons/heart-outline.svg";
import linkIcon from "@assets/icons/home.svg";
import githubIcon from "@assets/icons/logo-github.svg";
import { ORGANIZATION_MAP } from "@domains/filter/organization";
import { useState } from "react";
import type { ProjectDetail } from "@/apis/projectDetail/getProjectDetail.type";
import { CATEGORY_MAP } from "@domains/filter/category";
import formatDateToYMD from "@shared/utils/formatDateToYMD";
import * as S from "./TitleSection.styled";

interface TitleSectionProps {
  projectDetail: ProjectDetail;
}

function TitleSection({ projectDetail }: TitleSectionProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loveCount, setLoveCount] = useState<number>(projectDetail.loves);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLoveCount(isLiked ? loveCount - 1 : loveCount + 1);
  };

  return (
    <S.TitleSectionContainer>
      <S.TitleSectionLeft>
        <S.Subject>
          {projectDetail.categories
            .map((category) => `#${CATEGORY_MAP[category].label}`)
            .join(" ")}
        </S.Subject>
        <S.Organization>
          {ORGANIZATION_MAP[projectDetail.organization].label}
        </S.Organization>
        <S.ProductName>{projectDetail.title}</S.ProductName>
        <S.ProductDescription>{projectDetail.summary}</S.ProductDescription>
      </S.TitleSectionLeft>
      <S.TitleSectionRight>
        <S.RegistrationDate>
          {formatDateToYMD(projectDetail.createdAt)}
        </S.RegistrationDate>
        <S.LoveButton onClick={handleLikeToggle}>
          <img src={isLiked ? heartIcon : emptyHeartIcon} alt="좋아요 버튼" />
          <S.LoveCount>{loveCount}</S.LoveCount>
        </S.LoveButton>
        <S.ButtonBar>
          {projectDetail.githubUrl && (
            <S.NavLink
              href={projectDetail.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="github 바로가기 아이콘" />
              바로가기
            </S.NavLink>
          )}
          {projectDetail.productionUrl && (
            <S.NavLink
              href={projectDetail.productionUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkIcon} alt="link 바로가기 아이콘" />
              바로가기
            </S.NavLink>
          )}
        </S.ButtonBar>
      </S.TitleSectionRight>
    </S.TitleSectionContainer>
  );
}

export default TitleSection;
