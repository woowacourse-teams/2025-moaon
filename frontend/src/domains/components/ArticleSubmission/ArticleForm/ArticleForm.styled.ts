import styled from "@emotion/styled";

export const FormBox = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const FormTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;
  margin-bottom: 1.5rem;
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
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0569d4ff;
  }
`;

export const ArticleButtonList = styled.div`
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
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;
