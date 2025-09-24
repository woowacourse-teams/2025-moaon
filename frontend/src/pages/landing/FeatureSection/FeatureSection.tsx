import feature1Png from "@assets/images/feature-1.png";
import feature1Webp from "@assets/images/feature-1.webp";
import feature2Png from "@assets/images/feature-2.png";
import feature2Webp from "@assets/images/feature-2.webp";
import feature3Png from "@assets/images/feature-3.png";
import feature3Webp from "@assets/images/feature-3.webp";
import * as S from "./FeatureSection.styled";

function FeatureSection() {
  return (
    <S.FeatureSection aria-label="Feature Section">
      <S.Inner>
        <S.FeatureItem>
          <S.FeatureImageFrame>
            <picture>
              <source srcSet={feature1Webp} type="image/webp" />
              <S.FeatureImage src={feature1Png} alt="프로젝트 탐색과 필터링" />
            </picture>
          </S.FeatureImageFrame>
          <S.FeatureCopy>
            <S.FeatureTitle>
              <S.Kicker>‘기술’</S.Kicker>과 <S.Kicker>‘주제’</S.Kicker>로 필요한
              <br />
              프로젝트를 빠르게 찾으세요.
            </S.FeatureTitle>
            <S.FeatureDesc>
              React, Spring Boot, Kotlin, Swift...
              <br />
              원하는 기술 스택과 주제를 필터로 선택하면
              <br />
              관련 프로젝트를 한눈에 볼 수 있어요.
            </S.FeatureDesc>
          </S.FeatureCopy>
        </S.FeatureItem>

        <S.FeatureItem>
          <S.FeatureCopy>
            <S.FeatureTitle>
              <S.Kicker>맥락</S.Kicker> 있는 <S.Kicker>프로젝트 정보</S.Kicker>
              <br />
              코드만으로는 알 수 없는
              <br />
              <S.Kicker>‘이유’</S.Kicker>와 <S.Kicker>‘과정’</S.Kicker>을 함께
              <S.Kicker> 아티클</S.Kicker>에서.
            </S.FeatureTitle>
            <S.FeatureDesc>
              프로젝트 개요, GitHub, 배포 링크는 물론
              <br />
              ‘왜 이 기술을 썼는지’, ‘어떤 과정을 거쳤는지’
              <br />
              맥락까지 연결된 프로젝트 정보를 제공합니다.
            </S.FeatureDesc>
          </S.FeatureCopy>
          <S.FeatureImageFrame>
            <picture>
              <source srcSet={feature2Webp} type="image/webp" />
              <S.FeatureImage src={feature2Png} alt="프로젝트 아카이브 카드" />
            </picture>
          </S.FeatureImageFrame>
        </S.FeatureItem>

        <S.FeatureItem>
          <S.FeatureImageFrame>
            <picture>
              <source srcSet={feature3Webp} type="image/webp" />
              <S.FeatureImage src={feature3Png} alt="다른 사람의 경험 아티클" />
            </picture>
          </S.FeatureImageFrame>
          <S.FeatureCopy>
            <S.FeatureTitle>
              <S.Kicker>다른 사람의 경험</S.Kicker>을
              <br />내 프로젝트의 성장으로.
            </S.FeatureTitle>
            <S.FeatureDesc>
              트러블슈팅 기록, 기술 선택 배경, 구현 순서까지.
              <br />
              단순히 코드가 아니라, 전체적인 흐름 속에서
              <br />
              배울 수 있는 인사이트를 제공합니다.
            </S.FeatureDesc>
          </S.FeatureCopy>
        </S.FeatureItem>
      </S.Inner>
    </S.FeatureSection>
  );
}

export default FeatureSection;
