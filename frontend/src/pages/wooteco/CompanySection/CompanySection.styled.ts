import styled from "@emotion/styled";
import { Link } from "react-router";
import { BP_768, hoverUnderline } from "@/styles/global.styled";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e0e0e0;
  padding-top: 2rem;

  &:first-of-type {
    border-top: none;
    padding-top: 0;
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;

  @font-face {
    font-family: "GMarketSans";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: 500;
    font-display: swap;
  }

  font-family: "GMarketSans", sans-serif;
  word-break: keep-all;
  line-height: 1.3;

  ${BP_768} {
    font-size: 1rem;
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.5rem 0.5rem 1rem;
  gap: 0.5rem;
`;

export const MoreLink = styled(Link)`
  font-size: 1.125rem;
  color: #6e6e6e;
  font-family: "GMarketSans", sans-serif;
  ${hoverUnderline("#6e6e6e")}
  min-width: 5.125rem;

  ${BP_768} {
    font-size: 1rem;
  }
`;

export const Description = styled.p`
  color: #6e6e6e;
  word-break: keep-all;
  line-height: 1.3;

  ${BP_768} {
    font-size: 0.875rem;
  }
`;

export const CompanyImage = styled.img`
  width: 5rem;

  ${BP_768} {
    width: 3.75rem;
  }
`;
