import styled from "@emotion/styled";
import { BP_480, BP_1024, BP_1280 } from "@/styles/global.styled";

export const ArticleBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;

  ${BP_1280} {
    padding: 0 1.5rem;
  }

  ${BP_1024} {
    padding: 0 1rem;
  }

  ${BP_480} {
    padding: 0 0.5rem;
  }
`;
