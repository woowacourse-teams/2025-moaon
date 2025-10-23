import styled from "@emotion/styled";
import { BP_480, BP_768 } from "@/styles/global.styled";

export const ActivityBox = styled.div`
  padding: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #afafaf;
  font-size: 0.75rem;
  font-weight: 500;

  ${BP_768} {
    font-size: 0.71875rem;
  }
  ${BP_480} {
    font-size: 0.6875rem;
  }
`;

export const ActivityIcon = styled.img`
  width: 0.875rem;

  ${BP_768} {
    width: 0.8125rem;
  }
  ${BP_480} {
    width: 0.75rem;
  }
`;
