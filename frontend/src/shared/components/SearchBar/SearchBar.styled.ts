import styled from "@emotion/styled";

export const SearchForm = styled.form``;

export const SearchLabel = styled.label`
  width: 100%;
  border-bottom: 1px solid #d1d6dd;
  background: #fff;
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 1.875rem;
  font-size: 1.375rem;
  font-weight: 500;

  &::placeholder {
    color: #a4a4a4;
    font-weight: 400;
  }
`;

export const SearchIcon = styled.img`
  width: 1.75rem;
  aspect-ratio: 1/1;
`;
