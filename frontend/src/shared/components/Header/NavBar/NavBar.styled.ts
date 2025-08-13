import styled from "@emotion/styled";

export const NavBar = styled.nav``;

export const NavLinkList = styled.ul`
  display: flex;
  gap: 1.5rem;
  position: relative;
`;

export const NavLinkItem = styled.li``;

export const Link = styled.button<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? "#007bff" : "#000")};
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 400)};
  padding: 1.75rem 0;
  display: inline-block;
  font-size: 1rem;

  &:hover {
    font-weight: 600;
  }
`;

export const Underline = styled.div<{ left: number; width: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: 0.125rem;
  background-color: #007bff;
  border-radius: 62.5rem 62.5rem 0rem 0rem;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
