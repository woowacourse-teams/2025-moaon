import styled from "@emotion/styled";

export const FormFieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  & input,
  & textarea {
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

  & textarea {
    min-height: 6rem;
  }
`;

export const FormFieldLabelBox = styled.div`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
`;

export const FormFieldTitle = styled.h3`
  font-size: 1rem;
`;

export const FormFieldRequired = styled.span`
  font-size: 0.875rem;
  color: #f00;
`;
