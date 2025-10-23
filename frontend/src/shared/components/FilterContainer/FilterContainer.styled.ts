import styled from "@emotion/styled";
import { BP_480, BP_768 } from "@/styles/global.styled";

export const Container = styled.div`
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;

  ${BP_768} {
    gap: 0.5rem;
    flex-wrap: nowrap;
  }
  ${BP_480} {
    gap: 0.375rem;
    flex-wrap: nowrap;
  }
`;
