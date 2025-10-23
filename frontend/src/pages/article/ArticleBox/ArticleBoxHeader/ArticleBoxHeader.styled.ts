import styled from "@emotion/styled";
import { BP_480, BP_768 } from "@/styles/global.styled";

export const ArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArticleHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding-top: 2rem;
`;

export const FilterAndSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;

  ${BP_768} {
    gap: 0.75rem;
  }
`;

export const ArticleIntro = styled.p`
  color: #73798d;
  font-size: 1.125rem;

  ${BP_768} {
    font-size: 0.9375rem;
  }
  ${BP_480} {
    font-size: 0.875rem;
  }
`;

export const ArticleIntroText = styled.span`
  font-weight: 500;
  color: #007bff;

  ${BP_768} {
    font-weight: 600;
  }
`;

export const SectorTabContainer = styled.div`
  ${BP_768} {
    display: none;
  }
`;

export const SectorDropdownContainer = styled.div`
  display: none;

  ${BP_768} {
    display: block;
  }
`;

export const SortListContainer = styled.div`
  ${BP_768} {
    display: none;
  }
`;

export const SortDropdownContainer = styled.div`
  display: none;

  ${BP_768} {
    display: block;
  }
`;
