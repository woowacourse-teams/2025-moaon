import styled from "@emotion/styled";

export const ErrorContainer = styled.div<{ scope: "viewport" | "parent" }>`
  width: 100%;
  height: ${({ scope }) => (scope === "viewport" ? "100vh" : "100%")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const ErrorMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
