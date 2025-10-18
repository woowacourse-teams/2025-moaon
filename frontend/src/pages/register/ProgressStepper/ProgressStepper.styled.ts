import styled from "@emotion/styled";

export const ProgressStepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

export const StepWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Circle = styled.div<{ isCompleted: boolean; isActive: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  ${({ isCompleted, isActive }) => {
    if (isCompleted) {
      return `
        background-color: #e0edff;
        color: #2563eb;
      `;
    }
    if (isActive) {
      return `
        background-color: #2563eb;
        color: white;
      `;
    }
    return `
      background-color: #f2f4f7;
      color: #9ca3af;
    `;
  }}
`;

export const Label = styled.span<{ isCompleted: boolean; isActive: boolean }>`
  margin-left: 0.5rem;
  font-weight: 500;

  ${({ isCompleted, isActive }) => {
    if (isCompleted) return `color: #6b7280;`;
    if (isActive) return `color: #111827;`;
    return `color: #9ca3af;`;
  }}
`;

export const Divider = styled.div<{ isCompleted: boolean }>`
  width: 3rem;
  height: 0.125rem;
  margin: 0 0.75rem;
  border-radius: 2px;
  background-color: ${({ isCompleted }) =>
    isCompleted ? "#2563eb" : "#e5e7eb"};
`;
