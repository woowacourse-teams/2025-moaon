import styled from "@emotion/styled";
import type { Test } from "./SearchBar";

export const SearchForm = styled.form``;

export const SearchLabel = styled.label`
  width: 100%;
  background: #fff;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  border-bottom: 1px solid #d1d6dd;
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
`;

export const SearchIcon = styled.img<{
  variant: Test;
}>`
  width: ${({ variant }) => (variant === "small" ? "1.4rem" : "1.75rem")};
  aspect-ratio: 1/1;
  flex-shrink: 0;
`;

export const CloseButton = styled.button`
  padding: 0.3rem;
`;
