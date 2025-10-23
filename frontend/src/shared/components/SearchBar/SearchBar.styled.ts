import styled from "@emotion/styled";
import { BP_480, BP_768, BP_1024 } from "@/styles/global.styled";
import type { Test } from "./SearchBar";

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const SearchWrapper = styled.div``;

export const SearchLabel = styled.label`
  width: 100%;
  background: #fff;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-bottom: 1px solid #d1d6dd;

  ${BP_768} {
    padding: 0.625rem 0.875rem;
    gap: 0.7rem;
  }
  ${BP_480} {
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

  ${BP_1024} {
    font-size: ${({ variant }) =>
      variant === "small" ? "1.2rem" : "1.275rem"};

    &::placeholder {
      font-size: ${({ variant }) =>
        variant === "small" ? "1.2rem" : "1.275rem"};
    }
  }
  ${BP_768} {
    font-size: ${({ variant }) => (variant === "small" ? "1rem" : "1.1rem")};
    height: 1.75rem;

    &::placeholder {
      font-size: ${({ variant }) => (variant === "small" ? "1rem" : "1.1rem")};
    }
  }
  ${BP_480} {
    font-size: ${({ variant }) => (variant === "small" ? "0.8rem" : "0.9rem")};
    height: 1.625rem;

    &::placeholder {
      font-size: ${({ variant }) =>
        variant === "small" ? "0.8rem" : "0.9rem"};
    }
  }
`;

export const SearchIcon = styled.img<{
  variant: Test;
}>`
  width: ${({ variant }) => (variant === "small" ? "1.4rem" : "1.75rem")};
  aspect-ratio: 1/1;
  flex-shrink: 0;

  ${BP_768} {
    width: ${({ variant }) => (variant === "small" ? "1.25rem" : "1.5rem")};
  }
  ${BP_480} {
    width: ${({ variant }) => (variant === "small" ? "1.1rem" : "1.35rem")};
  }
`;

export const CloseButton = styled.button`
  padding: 0.3rem;

  ${BP_768} {
    padding: 0.25rem;
  }
  ${BP_480} {
    padding: 0.2rem;
  }
`;
