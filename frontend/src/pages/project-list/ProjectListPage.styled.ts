import styled from "@emotion/styled";
import { BP_480, BP_768, BP_1024, BP_1280 } from "@/styles/global.styled";

export const Main = styled.main`
  padding-bottom: 3rem;
  margin-top: 5rem;

  ${BP_1280} {
    margin-top: 4.5rem;
    padding: 0 1.5rem;
  }
  ${BP_1024} {
    margin-top: 4rem;
    padding: 0 1rem;
  }
  ${BP_768} {
    margin-top: 3.5rem;
  }
  ${BP_480} {
    margin-top: 3rem;
    padding: 0 0.5rem 2rem;
  }
`;

export const MainBox = styled.div`
  width: 34.375rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 4.6875rem;

  ${BP_1280} {
    width: 60rem;
  }
  ${BP_1024} {
    width: 48rem;
  }
  ${BP_768} {
    width: 100%;
    padding: 0 1.25rem;
    margin-bottom: 3rem;
  }
  ${BP_480} {
    padding: 0 1rem;
    gap: 1.25rem;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  ${BP_768} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

export const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;

  ${BP_1024} {
    font-size: 1.75rem;
  }
  ${BP_768} {
    font-size: 1.5rem;
  }
  ${BP_480} {
    font-size: 1.375rem;
  }
`;

export const MainDescription = styled.p`
  color: #73798d;
  font-size: 1.0938rem;
  font-weight: 500;

  ${BP_1024} {
    font-size: 1rem;
  }
  ${BP_768} {
    font-size: 0.9375rem;
  }
  ${BP_480} {
    font-size: 0.875rem;
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80rem;
  margin: 0 auto;
  padding-bottom: 2rem;

  ${BP_1280} {
    width: 64rem;
  }
  ${BP_1024} {
    width: 48rem;
  }
  ${BP_768} {
    width: 100%;
    padding: 0 1.25rem 1.5rem;
  }
  ${BP_480} {
    width: 100%;
    padding: 0 1rem 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.125rem;
  }
`;

export const Wrap = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  flex: 1 1 auto;
  min-width: 0;

  ${BP_768} {
    gap: 0.5rem;
  }
  ${BP_480} {
    gap: 0.375rem;
  }
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #d2d2d2;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #474747ff;

  &:hover {
    background-color: #f5f5f5;
    transition: background-color 0.5s ease;

    & > img {
      transform: rotate(180deg);
      transition: transform 0.5s ease;
    }
  }

  ${BP_768} {
    padding: 0.5rem 0.875rem;
    font-size: 0.9375rem;
  }
  ${BP_480} {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
`;
export const ResetIcon = styled.img`
  width: 1rem;

  ${BP_480} {
    width: 0.875rem;
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