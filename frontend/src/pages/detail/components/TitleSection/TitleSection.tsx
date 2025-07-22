import { useState } from "react";
import * as S from "./TitleSection.styled";
import emptyHeartIcon from "../../../../assets/icons/heart-outline.svg";
import heartIcon from "../../../../assets/icons/heart.svg";
import githubIcon from "../../../../assets/icons/logo-github.svg";
import linkIcon from "../../../../assets/icons/home.svg";

const subjects = ["IT", "커뮤니티"];
const organization = "우아한테크코스";
const productName = "모아온";
const productDescription = "프로젝트를 모아모아 모아온";
const date = "2025.07.22";

function TitleSection() {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(10);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
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
          <S.LikeCount>{likeCount}</S.LikeCount>
        </S.LoveButton>
        <S.ButtonBar>
          <S.Button>
            <img src={githubIcon} alt="github 바로가기 아이콘" />
            바로가기
          </S.Button>
          <S.Button>
            <img src={linkIcon} alt="link 바로가기 아이콘" />
            바로가기
          </S.Button>
        </S.ButtonBar>
      </S.TitleSectionRight>
    </S.TitleSectionContainer>
  );
}

export default TitleSection;
