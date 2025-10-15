import styled from "@emotion/styled";
import { Link } from "react-router";

export const Header = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid #dfdfdf;
  z-index: 999;
`;

export const HeaderBox = styled.div`
  width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1280px) {
    width: 64rem;
  }
  @media screen and (max-width: 1024px) {
    width: 48rem;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 1.25rem;
  }
  @media screen and (max-width: 480px) {
    padding: 0 1rem;
  }
`;

export const LogoLink = styled(Link)`
  font-size: 1.75rem;
  font-weight: 700;
  img {
    display: block;
    height: 2rem;
  }
  @media screen and (max-width: 768px) {
    img {
      height: 1.75rem;
    }
  }
  @media screen and (max-width: 480px) {
    img {
      height: 1.5rem;
    }
  }
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  @media screen and (max-width: 768px) {
    gap: 1.5rem;
  }
  @media screen and (max-width: 480px) {
    gap: 1rem;
  }
`;
