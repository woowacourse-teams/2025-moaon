import styled from "@emotion/styled";

export const LandingBannerSection = styled.section`
  width: 100vw;
  margin-top: 8.75rem;
`;

export const BannerPicture = styled.picture`
  display: block;
  width: 100%;
`;

export const BannerImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 5rem auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 4.5rem;
`;

export const BannerContent = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
`;
