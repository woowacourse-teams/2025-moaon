import styled from "@emotion/styled";
import { Link } from "react-router";
import { BP_480, BP_768 } from "@/styles/global.styled";

export const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;

  ${BP_768} {
    padding: 3rem 1.25rem;
  }

  ${BP_480} {
    padding: 2rem 1rem;
  }
`;

export const Container = styled.div`
  max-width: 40rem;
  text-align: center;

  ${BP_480} {
    max-width: 100%;
  }
`;

export const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 1rem;
  line-height: 1.2;

  ${BP_768} {
    font-size: 4.5rem;
    margin-bottom: 0.75rem;
  }

  ${BP_480} {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.75rem;

  ${BP_768} {
    font-size: 1.5rem;
    margin-bottom: 0.625rem;
  }

  ${BP_480} {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 2rem;
  line-height: 1.6;

  ${BP_768} {
    font-size: 0.9375rem;
    margin-bottom: 1.5rem;
  }

  ${BP_480} {
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
    line-height: 1.5;

    br {
      display: none;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  ${BP_480} {
    gap: 0.75rem;
  }
`;

export const HomeButton = styled(Link)`
  padding: 0.75rem 2rem;
  background-color: #007bff;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-decoration: none;

  &:hover {
    background-color: #046bdaff;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  ${BP_768} {
    padding: 0.625rem 1.75rem;
    font-size: 0.9375rem;
  }

  ${BP_480} {
    padding: 0.625rem 1.5rem;
    font-size: 0.875rem;
    width: 100%;
  }
`;
