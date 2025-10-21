import styled from "@emotion/styled";

export const ProjectInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const NextButton = styled.button`
  align-self: flex-end;
  padding: 0.6rem 2rem;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;

  &:hover {
    background-color: #0472e8ff;
  }
`;
