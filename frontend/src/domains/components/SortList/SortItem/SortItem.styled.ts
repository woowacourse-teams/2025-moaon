import styled from "@emotion/styled";
import { BP_480, BP_768, BP_1024 } from "@/styles/global.styled";

export const Item = styled.li``;

export const Button = styled.button<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? "#000" : "#aaa")};
  font-size: 1.0625rem;

  ${BP_1024} {
    font-size: 1rem;
  }
  ${BP_768} {
    font-size: 0.85rem;
  }
  ${BP_480} {
    font-size: 0.9rem;
  }
`;
