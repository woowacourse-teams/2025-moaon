import styled from "@emotion/styled";

export const GlobalLayout = styled.div<{ isLandingPage: boolean }>`
  ${({ isLandingPage }) =>
    isLandingPage
      ? `
      margin: 0;
      max-width: 100vw;
    `
      : `
      max-width: 80rem;
      margin: 2.25rem auto;
    `}
`;
