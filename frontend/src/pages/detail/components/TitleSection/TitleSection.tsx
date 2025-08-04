import heartIcon from "@assets/icons/heart.svg";
import emptyHeartIcon from "@assets/icons/heart-outline.svg";
import githubIcon from "@assets/icons/logo-github.svg";
import { PROJECT_CATEGORY_MAP } from "@domains/filter/projectCategory";
import formatDateToYMD from "@shared/utils/formatDateToYMD";
import { useState } from "react";
import type { ProjectDetail } from "@/apis/projectDetail/getProjectDetail.type";
import * as S from "./TitleSection.styled";

interface TitleSectionProps {
  projectDetail: ProjectDetail;
}

function TitleSection({ projectDetail }: TitleSectionProps) {
  const {
    categories,
    title,
    summary,
    createdAt,
    loves,
    githubUrl,
    productionUrl,
  } = projectDetail;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loveCount, setLoveCount] = useState<number>(loves);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLoveCount(isLiked ? loveCount - 1 : loveCount + 1);
  };

  return (
    <S.TitleSectionContainer>
      <S.TitleSectionLeft>
        <S.Subject>
          {categories
            .map((category) => `#${PROJECT_CATEGORY_MAP[category].label}`)
            .join(" ")}
        </S.Subject>
        <S.ProductName>{title}</S.ProductName>
        <S.ProductDescription>{summary}</S.ProductDescription>
      </S.TitleSectionLeft>
      <S.TitleSectionRight>
        <S.RegistrationDate>{formatDateToYMD(createdAt)}</S.RegistrationDate>
        <S.LoveButton onClick={handleLikeToggle}>
          <img src={isLiked ? heartIcon : emptyHeartIcon} alt="좋아요 버튼" />
          <S.LoveCount>{loveCount}</S.LoveCount>
        </S.LoveButton>
        <S.ButtonBar>
          {githubUrl && (
            <S.NavLink
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="github 바로가기 아이콘" />
              바로가기
            </S.NavLink>
          )}
          {productionUrl && (
            <S.NavLink
              href={productionUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              서비스 바로가기
            </S.NavLink>
          )}
        </S.ButtonBar>
      </S.TitleSectionRight>
    </S.TitleSectionContainer>
  );
}

export default TitleSection;
