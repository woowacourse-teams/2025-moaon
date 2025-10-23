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

export const FormFieldButton = styled.button<{ disabled: boolean }>`
  padding: 0.75rem 1rem;
  background-color: ${({ disabled }) => (disabled ? "#e5e7eb" : "#007bff")};
  color: #fff;
  border-radius: 8px;
  ${({ disabled }) => disabled && "cursor:not-allowed"};
`;

export const FormFieldInput = styled.input<{ hasError?: boolean }>`
  flex: 1;
  padding: 0.75rem 0.75rem;
  border: 1px solid ${({ hasError }) => (hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 0.5rem;

  &:focus-visible {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? "#dc2626" : "#005eff")};
    box-shadow: ${({ hasError }) =>
      hasError
        ? "0 0 0 4px rgba(239, 68, 68, 0.12)"
        : "0 0 0 4px rgba(0, 94, 255, 0.12)"};
  }
`;

export const FormFieldTextarea = styled.textarea<{ hasError?: boolean }>`
  resize: none;
  border: none;
  outline: none;
  flex: 1;
  padding: 0.75rem 0.5rem;
  border: 1px solid ${({ hasError }) => (hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 0.5rem;
  min-height: 6rem;

  &:focus-visible {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? "#dc2626" : "#005eff")};
    box-shadow: ${({ hasError }) =>
      hasError
        ? "0 0 0 4px rgba(239, 68, 68, 0.12)"
        : "0 0 0 4px rgba(0, 94, 255, 0.12)"};
  }
`;

export const FormFieldLabel = styled.label<{ readOnly: boolean }>`
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 16px;
  overflow: hidden;
  cursor: ${({ readOnly }) => (readOnly ? "not-allowed" : "pointer")};
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

export const FormFieldSelectionInput = styled.input<{ readOnly: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: ${({ readOnly }) => (readOnly ? "not-allowed" : "pointer")};

  &:checked + ${FormFieldLabelInner} > ${FormFieldLabelText} {
    color: #fff;
  }
  &:checked + ${FormFieldLabelInner} {
    background-color: #007bff;
  }
`;

export const FormFieldErrorBox = styled.div`
  min-height: 1rem;
  margin-top: 0.25rem;
`;

export const FormFieldErrorText = styled.p`
  margin: 0;
  color: #ef4444;
  font-size: 0.8125rem;
  line-height: 1.2;
`;
