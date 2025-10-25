import eyeIcon from "@assets/icons/eye.svg";
import heartIcon from "@assets/icons/heart.svg";
import emptyHeartIcon from "@assets/icons/heart-outline.svg";
import githubIcon from "@assets/icons/logo-github.svg";
import productionIcon from "@assets/icons/production.svg";
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
    views,
    githubUrl,
    productionUrl,
  } = projectDetail;
  // const [isLiked, setIsLiked] = useState<boolean>(false);
  // const [loveCount, setLoveCount] = useState<number>(loves);

  // const handleLikeToggle = () => {
  //   setIsLiked(!isLiked);
  //   setLoveCount(isLiked ? loveCount - 1 : loveCount + 1);
  // };

  return (
    <S.TitleSectionContainer>
      <S.TitleSectionLeft tabIndex={0}>
        <S.OverlineSection>
          <S.Subject>
            {categories
              .map((category) => `${PROJECT_CATEGORY_MAP[category].label}`)
              .join(", ")}
          </S.Subject>
          |<S.RegistrationDate>{formatDateToYMD(createdAt)}</S.RegistrationDate>
        </S.OverlineSection>
        <S.ProductName>{title}</S.ProductName>
        <S.ProductDescription>{summary}</S.ProductDescription>
      </S.TitleSectionLeft>
      <S.TitleSectionRight>
        <S.View tabIndex={0}>
          <img src={eyeIcon} alt="조회수" />
          {views.toLocaleString()}
        </S.View>
        <S.OverlineSection>
          {/* <S.LoveButton isLiked={isLiked} onClick={handleLikeToggle}>
            <img src={isLiked ? heartIcon : emptyHeartIcon} alt="좋아요 버튼" />
            <S.LoveCount>{loveCount}</S.LoveCount>
          </S.LoveButton> */}
          <S.ButtonBar>
            {githubUrl && (
              <S.GithubLink
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="깃허브 바로가기"
              >
                <img width={23} src={githubIcon} alt="" />
                깃허브
              </S.GithubLink>
            )}
            {productionUrl && (
              <S.ProductionLink
                href={productionUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="서비스 바로가기"
              >
                <img src={productionIcon} alt="" />
                서비스
              </S.ProductionLink>
            )}
          </S.ButtonBar>
        </S.OverlineSection>
      </S.TitleSectionRight>
    </S.TitleSectionContainer>
  );
}

export default TitleSection;
