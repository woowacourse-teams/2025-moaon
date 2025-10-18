import styled from "@emotion/styled";

export const ArticleBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;

  @media screen and (max-width: 1280px) {
    padding: 0 1.5rem;
  }

  @media screen and (max-width: 1024px) {
    padding: 0 1rem;
  }
  @media screen and (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;
