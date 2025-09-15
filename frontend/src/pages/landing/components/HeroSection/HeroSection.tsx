import heroImage from "@assets/images/landing-hero.png";
import heroImageWebp from "@assets/images/landing-hero.webp";
import * as S from "./HeroSection.styled";

function HeroSection() {
  return (
    <S.HeroSection aria-label="Hero Section">
      <S.HeroPicture>
        <source srcSet={heroImageWebp} type="image/webp" />
        <S.HeroImage src={heroImage} alt="Hero Section" />
      </S.HeroPicture>
    </S.HeroSection>
  );
}

export default HeroSection;
