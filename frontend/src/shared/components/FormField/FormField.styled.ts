import styled from "@emotion/styled";

export const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FormFieldHeader = styled.label`
  display: flex;
  gap: 0.5rem;
`;

export const FormFieldTitle = styled.h3`
  font-size: 1rem;
`;

export const FormFieldRequiredMark = styled.span`
  font-size: 0.875rem;
  color: #f00;
`;

export const FormFieldButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #007bff;
  color: #fff;
  border-radius: 8px;

  &:hover {
    background-color: #0569d4ff;
  }
`;

export const FormFieldInput = styled.input`
  flex: 1;
  padding: 0.75rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;

  &:focus-visible {
    outline: none;
    border-color: #005eff;
    box-shadow: 0 0 0 4px rgba(0, 94, 255, 0.12);
  }
`;

export const FormFieldTextarea = styled.textarea`
  flex: 1;
  padding: 0.75rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  min-height: 6rem;

  &:focus-visible {
    outline: none;
    border-color: #005eff;
    box-shadow: 0 0 0 4px rgba(0, 94, 255, 0.12);
  }
`;

export const FormFieldLabel = styled.label`
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
`;

export const FormFieldLabelInner = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
`;

export const FormFieldLabelImage = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

export const FormFieldLabelText = styled.span`
  font-size: 0.875rem;
`;

export const FormFieldSelectionInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;

  &:checked + ${FormFieldLabelInner} > ${FormFieldLabelText} {
    color: #fff;
  }
  &:checked + ${FormFieldLabelInner} {
    background-color: #007bff;
  }
`;

export const FormFieldErrorBox = styled.div`
  min-height: 1rem;
`;

export const FormFieldErrorText = styled.p`
  color: #ef4444;
  font-size: 0.8125rem;
`;
