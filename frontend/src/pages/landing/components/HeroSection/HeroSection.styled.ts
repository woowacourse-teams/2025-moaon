import styled from "@emotion/styled";

export const HeroSection = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const HeroPicture = styled.picture`
  display: block;
  width: 100%;
`;

export const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: calc(100dvh - 4.75rem);
  object-fit: cover;
  object-position: center;
`;
