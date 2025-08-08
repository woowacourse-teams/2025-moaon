import styled from "@emotion/styled";

export const CardList = styled.ul`
  margin: 1rem auto;
  width: 80rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
  gap: 1.5rem;
`;

export const ProjectIntro = styled.p`
  color: #73798d;
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
`;

export const ProjectIntroText = styled.span`
  color: #007bff;
  font-weight: 500;
`;
