import styled from "@emotion/styled";
import { BP_480 } from "@/styles/global.styled";

export const CardListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 1.375rem 2rem;
  min-height: 13.6875rem;

  ${BP_480} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const SkipToTitleButton = styled.a`
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 1000;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  background: #111;
  color: #fff;
  text-decoration: none;
  outline: none;
  transform: translateY(-150%);
  transition: transform 0.2s ease;

  &:focus {
    transform: translateY(0);
  }
`;
