import styled from "@emotion/styled";

export const SearchForm = styled.form``;

export const SearchBox = styled.label<{
  position: "left" | "right";
  shape: "default" | "rounded";
  width: "full" | "fixed";
}>`
  width: ${({ width }) => (width === "full" ? "100%" : "17.1875rem")};
  border: 1px solid #6b7684;
  border-radius: ${({ shape }) => (shape === "rounded" ? "20px" : "12px")};
  padding: 0.75rem;
  display: flex;
  flex-direction: ${({ position }) =>
    position === "left" ? "row" : "row-reverse"};
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;

  &:focus-within {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  }
`;

export const SearchInput = styled.input`
  width: 100%;

  &::placeholder {
    color: #8b95a1;
  }
`;

export const Button = styled.button``;

export const SearchIcon = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  aspect-ratio: 1/1;
`;
