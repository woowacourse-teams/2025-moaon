import styled from "@emotion/styled";
import { Link } from "react-router";
import { BP_480, BP_768 } from "@/styles/global.styled";

export const Title = styled.h2`
  font-size: 1.75rem;
  color: #333;
  text-align: center;
  line-height: 1.7;
  margin-top: 1.5rem;

  ${BP_480} {
    font-size: 1.25rem;
    word-break: keep-all;
  }
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
  gap: 2.5rem 4rem;
  width: 100%;
  padding: 0 2rem;
  height: 21.875rem;
  margin-top: 3.5rem;

  ${BP_768} {
    gap: 1rem 2rem;
  }

  ${BP_480} {
    margin-top: 1.5rem;
    grid-template-columns: repeat(2, auto);
    place-items: center;
    gap: auto;
    height: auto;
    padding: 0;
  }
`;

export const CompanyListItem = styled.li`
  width: 9.375rem;
  height: 9.375rem;

  ${BP_768} {
    width: 7.8125rem;
    height: 7.8125rem;
  }
`;

export const CompanyLogo = styled.img`
  width: 100%;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const LinkButton = styled(Link)`
  padding: 1.25rem 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff6b6b;
  color: #fff;
  border-radius: 24px;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 3.5rem;
  display: inline-block;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
  }

  ${BP_768} {
    width: 90%;
    padding: 1.25rem 0;
    text-align: center;
  }

  ${BP_480} {
    margin-top: 1.5rem;
    font-size: 1.125rem;
  }
`;
