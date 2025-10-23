import styled from "@emotion/styled";

export const ProjectInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NextButton = styled.button`
  align-self: flex-end;
  padding: 0.6rem 2rem;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.5rem;

  &:hover:not(:disabled) {
    background-color: #0472e8ff;
  }

  &:disabled {
    background-color: #9ea3aaff;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
