import heroImage from "@assets/images/landing-hero.png";
import heroImageWebp from "@assets/images/landing-hero.webp";

function HeroSection() {
  return (
    <section>
      <picture>
        <source srcSet={heroImageWebp} type="image/webp" />
        <img src={heroImage} alt="Hero Section" />
      </picture>
    </section>
  );
}

export default HeroSection;
