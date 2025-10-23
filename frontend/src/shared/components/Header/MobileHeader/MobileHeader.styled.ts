import styled from "@emotion/styled";
import { Link } from "react-router";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

export const TopBar = styled.div`
  padding: 1.125rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
`;

export const HamburgerButton = styled.button`
  width: 2.5rem;
  aspect-ratio: 1/1;
  border: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HamburgerButtonLine = styled.hr`
  display: block;
  width: 1.375rem;
  height: 0.125rem;
  background: #111;
  border: none;
  border-radius: 1px;
  transition: transform 0.2s ease, opacity 0.2s ease;
  margin: 0.1875rem 0;
`;

export const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.38);
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 999;

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
`;

export const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: min(82vw, 360px);
  background: #fff;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.08);
  transform: translateX(100%);
  transition: transform 0.25s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(100%)")};
`;

export const DrawerHeader = styled.div`
  height: 4.75rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
`;

export const DrawerTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const DrawerContent = styled.nav`
  flex: 1 1 auto;

  ul,
  li {
    display: block;
  }

  & ul > li > button {
    padding: 1.25rem 0.5rem 1.25rem 1rem;
    width: 100%;
    text-align: left;
  }
`;

export const DrawerFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  button,
  a {
    width: 100%;
    justify-content: center;
  }
`;

export const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
`;
