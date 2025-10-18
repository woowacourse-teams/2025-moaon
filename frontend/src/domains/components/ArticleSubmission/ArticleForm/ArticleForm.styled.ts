import styled from "@emotion/styled";

export const FormBox = styled.form`
  width: 100%;
`;

export const FormFieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

export const ArticleAddButton = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

export const ArticleCancelButton = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #ddd;
  color: #777;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;
