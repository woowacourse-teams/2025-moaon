import styled from "@emotion/styled";
import { Link as ReactRouterLink } from "react-router";
import { BP_480, BP_768 } from "@/styles/global.styled";

export const Container = styled.div`
  width: 100vw;
  position: relative;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin-top: 1.5rem;

  ${BP_768} {
    font-size: 1.25rem;
    padding-bottom: 1rem;
  }

  ${BP_480} {
    font-size: 1.125rem;
  }
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 3rem auto 0;

  ${BP_768} {
    width: 100%;
  }

  ${BP_480} {
    margin: 1rem auto 0;
  }
`;

export const Box = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-right: 1px solid #d2d2d2;
  height: 31.25rem;

  &:last-of-type {
    border-right: none;
  }
  ${BP_768} {
    justify-content: center;
    gap: 2rem;
    height: 400px;
  }

  ${BP_480} {
    height: 275px;
  }
`;

export const SubTitle = styled.p<{ color: string }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ color }) => color};

  ${BP_768} {
    font-size: 1.25rem;
  }

  ${BP_480} {
    font-size: 0.875rem;
    word-break: break-all;
  }
`;

export const Image = styled.img`
  width: 15.625rem;
  aspect-ratio: 1/1;

  ${BP_768} {
    width: 12.5rem;
  }

  ${BP_480} {
    width: 6.25rem;
  }
`;

export const Link = styled(ReactRouterLink)<{ $backgroundColor: string }>`
  font-size: 1.25rem;
  font-weight: 500;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: #fff;
  padding: 1.25rem 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
  }

  ${BP_768} {
    font-size: 1rem;
    width: 80%;
    text-align: center;
    line-height: 1.4;
    word-break: keep-all;
    padding: 1.25rem 2rem;
  }

  ${BP_480} {
    font-size: 0.875rem;
    padding: 1.25rem 0.5rem;
  }
`;
