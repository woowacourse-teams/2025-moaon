import styled from "@emotion/styled";
import { BP_480, BP_768, BP_1024, BP_1280 } from "@/styles/global.styled";

export const CardList = styled.ul`
  margin: 1rem auto;
  width: 80rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
  gap: 1.5rem;

  ${BP_1280} {
    width: 64rem;
    gap: 1.5rem;
  }
  ${BP_1024} {
    width: 48rem;
    grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
    gap: 1.25rem;
  }
  ${BP_768} {
    width: 100%;
    padding: 0 1.25rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  ${BP_480} {
    padding: 0 1rem;
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }
`;

export const ProjectIntro = styled.p`
  color: #73798d;
  font-size: 1.125rem;
  width: 80rem;
  margin: 0 auto 1.25rem;

  ${BP_1280} {
    width: 64rem;
  }
  ${BP_1024} {
    width: 48rem;
    font-size: 1rem;
  }
  ${BP_768} {
    font-size: 0.9375rem;
    width: 100%;
    padding: 0 1.25rem;
  }
  ${BP_480} {
    font-size: 0.875rem;
    padding: 0 1rem;
  }
`;

export const ProjectIntroText = styled.span`
  color: #007bff;
  font-weight: 500;

  ${BP_768} {
    font-weight: 600;
  }
`;
