import styled from "@emotion/styled";

export const Main = styled.main`
  padding-bottom: 3rem;
  margin-top: 5rem;

  @media screen and (max-width: 1280px) {
    margin-top: 4.5rem;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 4rem;
  }
  @media screen and (max-width: 768px) {
    margin-top: 3.5rem;
  }
  @media screen and (max-width: 480px) {
    margin-top: 3rem;
    padding-bottom: 2rem;
  }
`;

export const MainBox = styled.div`
  width: 34.375rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 4.6875rem;

  @media screen and (max-width: 1280px) {
    width: 60rem;
  }
  @media screen and (max-width: 1024px) {
    width: 48rem;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 1.25rem;
    margin-bottom: 3rem;
  }
  @media screen and (max-width: 480px) {
    padding: 0 1rem;
    gap: 1.25rem;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

export const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;

  @media screen and (max-width: 1024px) {
    font-size: 1.75rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 1.375rem;
  }
`;

export const MainDescription = styled.p`
  color: #73798d;
  font-size: 1.0938rem;
  font-weight: 500;
  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.9375rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;
