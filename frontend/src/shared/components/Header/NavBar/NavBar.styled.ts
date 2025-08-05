import styled from "@emotion/styled";
import { NavLink } from "react-router";

export const NavBar = styled.nav``;

export const NavLinkList = styled.ul`
  display: flex;
  gap: 1.5rem;
  position: relative;
`;

export const NavLinkItem = styled.li``;

export const Link = styled(NavLink)`
  color: #000;
  font-weight: 400;

  &:hover {
    font-weight: 600;
  }

  &[aria-current="page"] {
    color: #007bff;
    font-weight: 700;
  }
`;

export const Underline = styled.div<{ left: number; width: number }>`
  position: absolute;
  bottom: -1.6875rem;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: 0.125rem;
  background-color: #007bff;
  border-radius: 62.5rem 62.5rem 0rem 0rem;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
