import styled from "@emotion/styled";
import type { Test } from "./SearchBar";

export const SearchWrapper = styled.div``;

export const SearchLabel = styled.label`
  width: 100%;
  background: #fff;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  border-bottom: 1px solid #d1d6dd;
  @media screen and (max-width: 768px) {
    padding: 0.625rem 0.875rem;
    gap: 0.7rem;
  }
  @media screen and (max-width: 480px) {
    padding: 0.5rem 0.75rem;
    gap: 0.6rem;
  }
`;

export const SearchInput = styled.input<{
  variant: Test;
}>`
  flex: 1;
  height: 1.875rem;
  font-weight: 500;
  font-size: ${({ variant }) => (variant === "small" ? "1.3rem" : "1.375rem")};

  &::placeholder {
    color: #a4a4a4;
    font-weight: 400;
  }
  @media screen and (max-width: 1024px) {
    font-size: ${({ variant }) =>
      variant === "small" ? "1.2rem" : "1.275rem"};
  }
  @media screen and (max-width: 768px) {
    font-size: ${({ variant }) => (variant === "small" ? "1.1rem" : "1.2rem")};
    height: 1.75rem;
  }
  @media screen and (max-width: 480px) {
    font-size: ${({ variant }) => (variant === "small" ? "1rem" : "1.1rem")};
    height: 1.625rem;
  }
`;

export const SearchIcon = styled.img<{
  variant: Test;
}>`
  width: ${({ variant }) => (variant === "small" ? "1.4rem" : "1.75rem")};
  aspect-ratio: 1/1;
  flex-shrink: 0;
  @media screen and (max-width: 768px) {
    width: ${({ variant }) => (variant === "small" ? "1.25rem" : "1.5rem")};
  }
  @media screen and (max-width: 480px) {
    width: ${({ variant }) => (variant === "small" ? "1.1rem" : "1.35rem")};
  }
`;

export const CloseButton = styled.button`
  padding: 0.3rem;
  @media screen and (max-width: 768px) {
    padding: 0.25rem;
  }
  @media screen and (max-width: 480px) {
    padding: 0.2rem;
  }
`;
