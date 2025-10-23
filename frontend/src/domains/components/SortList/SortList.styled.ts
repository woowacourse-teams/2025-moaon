import styled from "@emotion/styled";
import { BP_480, BP_768 } from "@/styles/global.styled";

export const List = styled.ul`
  display: flex;
  gap: 0.625rem;
  align-items: center;

  ${BP_768} {
    gap: 0.5rem;
  }
  ${BP_480} {
    gap: 0.375rem;
  }
`;

export const Separator = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background-color: #aaa;

  ${BP_768} {
    width: 0.175rem;
    height: 0.175rem;
  }
  ${BP_480} {
    width: 0.15rem;
    height: 0.15rem;
  }
`;
