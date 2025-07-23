import styled from "@emotion/styled";
import { Link as ReactRouterLink } from "react-router";

export const NavBar = styled.nav``;

export const NavLinkList = styled.ul`
  display: flex;
  gap: 1rem;
`;

export const NavLink = styled.li``;

export const Link = styled(ReactRouterLink)`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 0.0625rem;
    bottom: -0.1875rem;
    left: 0;
    background-color: #000;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;
