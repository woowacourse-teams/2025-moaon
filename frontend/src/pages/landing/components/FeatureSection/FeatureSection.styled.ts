import styled from "@emotion/styled";

export const FeatureSection = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  position: relative;
  color: #000;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7.5rem;
`;

export const FeatureImageFrame = styled.div`
  background: #e8e8e8;
  border-radius: 1.25rem;
  padding: 1.25rem;
  width: clamp(280px, 47vw, 600px);

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const FeatureImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
`;

export const FeatureCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Kicker = styled.span`
  color: #3f83f8;
`;

export const FeatureTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.25;
`;

export const FeatureDesc = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.9;
`;
