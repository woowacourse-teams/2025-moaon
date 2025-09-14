import styled from "@emotion/styled";

export const CardListContainer = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 1.375rem 2rem;
`;

export const EmptyContainer = styled.div`
  width: 100%;
`;
