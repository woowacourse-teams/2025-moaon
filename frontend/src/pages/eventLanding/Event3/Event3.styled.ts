import styled from "@emotion/styled";
import { Link } from "react-router";
import { BP_480, BP_768 } from "@/styles/global.styled";

export const Title = styled.h2`
  font-size: 1.75rem;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin-top: 1.5rem;

  ${BP_480} {
    font-size: 1.5rem;
  }
`;

export const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;

  ${BP_480} {
    font-size: 0.875rem;
    word-break: keep-all;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;

  ${BP_768} {
    width: 100%;
    padding: 0 1rem;
  }
`;

export const LinkButton = styled(Link)`
  padding: 1.25rem 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #45b7d1;
  color: #fff;
  border-radius: 24px;
  font-size: 1.25rem;
  font-weight: 600;
  display: inline-block;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
  }

  ${BP_768} {
    width: 100%;
    text-align: center;
    padding: 1.25rem 0;
  }

  ${BP_480} {
    font-size: 1rem;
  }
`;
