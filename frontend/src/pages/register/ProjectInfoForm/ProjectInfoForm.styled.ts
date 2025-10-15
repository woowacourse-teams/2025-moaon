import styled from "@emotion/styled";

export const FormFieldGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SelectedTechStacks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const TechStackTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background-color: #f0f0f0;

  border-radius: 16px;
  font-size: 0.875rem;
  color: #333;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    color: #999;
    font-size: 1.125rem;
    cursor: pointer;
    margin-bottom: 0.125rem;
  }
`;

export const NextButton = styled.button`
  align-self: flex-end;
  padding: 0.6rem 2rem;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #0472e8ff;
  }
`;
