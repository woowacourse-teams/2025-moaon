import styled from "@emotion/styled";

export const FormBox = styled.form`
  width: 100%;
`;

export const FormFieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ArticleAddressBox = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ArticleAddressButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #007bff;
  color: #fff;
  border-radius: 8px;

  &:hover {
    background-color: #0569d4ff;
  }
`;

export const ArticleButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ArticleAddButton = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  background-color: ${({ disabled }) => (disabled ? "#9ea3aaff" : "#007bff")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  color: #fff;
  border-radius: 8px;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const ArticleCancelButton = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  color: #000;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;
