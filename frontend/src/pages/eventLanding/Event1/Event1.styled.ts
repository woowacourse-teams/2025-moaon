import styled from "@emotion/styled";
import { Link } from "react-router";

export const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin-top: 2rem;
`;

export const CompanyText = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  display: inline-block;
  padding: 0 0.0625rem;
`;

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: center;
  gap: 2rem 4rem;
  width: 100%;
  padding: 0 2rem;
  height: 350px;
  margin-top: 3rem;
`;

export const CompanyLogo = styled.img`
  width: 150px;
  height: 150px;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const LinkButton = styled(Link)`
  padding: 1.25rem 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff6b6b;
  color: #fff;
  border-radius: 24px;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 3rem;
  display: inline-block;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
  }
`;
