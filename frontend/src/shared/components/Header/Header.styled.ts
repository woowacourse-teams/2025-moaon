import styled from "@emotion/styled";
import { Link } from "react-router";

export const Header = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  padding: 1.25rem 0;
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
`;

export const LogoLink = styled(Link)`
  font-size: 28px;
  font-weight: 700;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;
