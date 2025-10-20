import styled from "@emotion/styled";
import { BP_480, BP_768, BP_1024 } from "@/styles/global.styled";

export const TechStackList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.25rem 0 0;
  gap: 0.375rem;
  height: 1.25rem;
  overflow: hidden;

  ${BP_768} {
    gap: 0.3125rem;
  }
  ${BP_480} {
    gap: 0.25rem;
  }
`;

export const TechStack = styled.li`
  color: #7f7f7f;
  font-size: 0.8125rem;
  font-weight: 500;

  ${BP_1024} {
    font-size: 0.78125rem;
  }
  ${BP_768} {
    font-size: 0.75rem;
  }
  ${BP_480} {
    font-size: 0.71875rem;
  }
`;

export const Separator = styled.div`
  background-color: #7f7f7f;
  width: 0.125rem;
  height: 0.125rem;
  border-radius: 50%;
  display: flex;

  ${BP_768} {
    width: 0.09375rem;
    height: 0.09375rem;
  }
`;
