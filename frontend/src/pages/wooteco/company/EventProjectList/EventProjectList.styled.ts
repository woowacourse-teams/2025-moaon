import styled from "@emotion/styled";
import { BP_1280 } from "@/styles/global.styled";

export const List = styled.ul`
  margin: 1rem auto;
  width: 80rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
  gap: 1.5rem;

  ${BP_1280} {
    width: 100%;
  }
`;
