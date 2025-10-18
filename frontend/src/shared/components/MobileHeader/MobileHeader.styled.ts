import styled from "@emotion/styled";
import { Link } from "react-router";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

export const TopBar = styled.div`
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  img {
    height: 28px;
    width: auto;
    display: block;
  }
`;

export const HamburgerButton = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    display: block;
    width: 22px;
    height: 2px;
    background: #111;
    border-radius: 1px;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  span + span {
    margin-top: 5px;
  }
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
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
`;

export const DrawerTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
`;

export const DrawerContent = styled.nav`
  padding: 12px 16px;
  flex: 1 1 auto;

  ul,
  li {
    display: block;
  }
`;

export const DrawerFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #f0f0f0;

  button,
  a {
    width: 100%;
    justify-content: center;
  }
`;
