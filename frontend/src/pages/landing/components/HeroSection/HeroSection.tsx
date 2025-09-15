import arrowDown from "@assets/icons/arrow-down.svg";
import heroImage from "@assets/images/landing-hero.png";
import heroImageWebp from "@assets/images/landing-hero.webp";
import LinkButton from "../shared/LinkButton/LinkButton";
import * as S from "./HeroSection.styled";

function HeroSection() {
  return (
    <S.HeroSection aria-label="Hero Section">
      <S.Overlay>
        <S.OverlayInner>
          <S.Tagline>
            프로젝트의 맥락과 함께 인사이트를 탐색할 수 있는 플랫폼
          </S.Tagline>
          <S.Title>프로젝트와 아티클을, 모아온 📦</S.Title>
          <S.Description>
            관심 있는 프로젝트를 한 곳에서 모아보세요.
            <br />
            GitHub, 블로그에 흩어진 사이드 프로젝트의
            <br />
            인사이트를 모아온에서 탐색하세요.
          </S.Description>
          <LinkButton href="/project">둘러보기</LinkButton>
        </S.OverlayInner>
      </S.Overlay>
      <S.HeroPicture>
        <source srcSet={heroImageWebp} type="image/webp" />
        <S.HeroImage src={heroImage} alt="" />
      </S.HeroPicture>
      <S.ArrowIcon src={arrowDown} alt="아래로 스크롤 하세요" />
      <S.Dim />
    </S.HeroSection>
  );
}

export default HeroSection;
