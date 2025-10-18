import styled from "@emotion/styled";

export const ArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArticleHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding-top: 2rem;
`;

export const ArticleIntro = styled.p`
  color: #73798d;
  font-size: 1.125rem;

  @media screen and (max-width: 768px) {
    font-size: 0.9375rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

export const ArticleIntroText = styled.span`
  font-weight: 500;
  color: #007bff;
  @media screen and (max-width: 768px) {
    font-weight: 600;
  }
`;

export const SectorTabContainer = styled.div`
  @media screen and (max-width: 720px) {
    display: none;
  }
`;

export const SectorDropdownContainer = styled.div`
  display: none;
  @media screen and (max-width: 720px) {
    display: block;
  }
`;
