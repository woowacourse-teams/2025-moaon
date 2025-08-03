import styled from "@emotion/styled";
import { Link as ReactRouterLink } from "react-router";

export const NavBar = styled.nav``;

export const NavLinkList = styled.ul`
  display: flex;
  gap: 1.5rem;
  position: relative;
`;

export const NavLink = styled.li``;

export const Link = styled(ReactRouterLink, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  color: ${({ active }) => (active ? "#007BFF" : "#000")};
  font-weight: ${({ active }) => (active ? "600" : "400")};
`;

export const Underline = styled.div<{ left: number; width: number }>`
  position: absolute;
  bottom: -1.625rem;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: 0.0625rem;
  background-color: #007bff;
  border-radius: 62.5rem 62.5rem 0rem 0rem;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
