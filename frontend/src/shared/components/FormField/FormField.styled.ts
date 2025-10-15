import styled from "@emotion/styled";

export const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  & input {
    flex: 1;
    padding: 0.75rem 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;

    &:focus-visible {
      outline: none;
      border-color: #005eff;
      box-shadow: 0 0 0 4px rgba(0, 94, 255, 0.12);
    }
  }
`;

export const FormFieldHeader = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FormFieldTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

export const FormFieldRequired = styled.span`
  font-size: 0.875rem;
  color: #f00;
`;
