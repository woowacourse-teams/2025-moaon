import styled from "@emotion/styled";

export const SearchBox = styled.label`
  width: 17.1875rem;
  border: 1px solid #6b7684;
  border-radius: 20px;
  padding: .75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:focus-within {
    border-color: #007bff;  
    box-shadow: 0 0 0 2px rgba(0,123,255,0.15);
  }
`;

export const SearchInput = styled.input`
  &::placeholder{
    color: #8b95a1;
  }
`;
