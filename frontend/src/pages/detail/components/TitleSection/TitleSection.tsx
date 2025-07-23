import heartIcon from "@assets/icons/heart.svg";
import emptyHeartIcon from "@assets/icons/heart-outline.svg";
import linkIcon from "@assets/icons/home.svg";
import githubIcon from "@assets/icons/logo-github.svg";
import { useState } from "react";
import * as S from "./TitleSection.styled";

interface TitleSectionProps {
  subjects?: string[];
  organization?: string;
  productName?: string;
  productDescription?: string;
  date?: string;
  likeCount?: number;
  githubUrl?: string;
  linkUrl?: string;
}

function TitleSection({
  subjects = ["IT", "커뮤니티"],
  organization = "우아한테크코스",
  productName = "모아온",
  productDescription = "프로젝트를 모아모아 모아온",
  date = "2025.07.22",
  likeCount = 10,
  githubUrl = "https://github.com/woowacourse-teams/2025-moaon",
  linkUrl = "https://d2ye9egv48bag1.cloudfront.net/",
}: TitleSectionProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loveCount, setLoveCount] = useState<number>(likeCount);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLoveCount(isLiked ? loveCount - 1 : loveCount + 1);
  };

  return (
    <S.TitleSectionContainer>
      <S.TitleSectionLeft>
        <S.Subject>
          {subjects.map((subject) => `#${subject}`).join(" ")}
        </S.Subject>
        <S.Organization>{organization}</S.Organization>
        <S.ProductName>{productName}</S.ProductName>
        <S.ProductDescription>{productDescription}</S.ProductDescription>
      </S.TitleSectionLeft>
      <S.TitleSectionRight>
        <S.RegistrationDate>{date}</S.RegistrationDate>
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
          {linkUrl && (
            <S.NavLink href={linkUrl} target="_blank" rel="noopener noreferrer">
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
