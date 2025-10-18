import styled from "@emotion/styled";
import { BP_480 } from "@/styles/global.styled";

export const CardListContainer = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 1.375rem 2rem;

  ${BP_480} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const EmptyContainer = styled.div`
  width: 100%;
`;
