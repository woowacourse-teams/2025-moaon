import styled from "@emotion/styled";

export const TechStackList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0.25rem 0 0;
  gap: 0.75rem;
  min-height: 2.625rem;
`;

export const AdditionalCount = styled.div`
  border: 1px solid #d2d2d2;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
