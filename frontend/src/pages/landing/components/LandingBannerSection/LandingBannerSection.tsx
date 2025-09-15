import bannerPng from "@assets/images/landing-banner.png";
import bannerWebp from "@assets/images/landing-banner.webp";
import CtaButton from "../shared/CtaButton/CtaButton";
import * as S from "./LandingBannerSection.styled";

function LandingBannerSection() {
  return (
    <S.LandingBannerSection aria-label="Landing Banner">
      <S.BannerPicture>
        <source srcSet={bannerWebp} type="image/webp" />
        <S.BannerImage src={bannerPng} alt="" />
      </S.BannerPicture>
      <S.Inner>
        <S.BannerContent>
          모아온
          <br />
          흩어진 프로젝트, 이제 한 곳에서.
        </S.BannerContent>
        <CtaButton href="/project">지금 시작하기</CtaButton>
      </S.Inner>
    </S.LandingBannerSection>
  );
}

export default LandingBannerSection;
