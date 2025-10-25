import styled from "@emotion/styled";

export const ArticleSubmissionContainer = styled.section`
  width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ArticleSubmissionButton = styled.button<{ disabled: boolean }>`
  flex: 1;
  background-color: ${({ disabled }) => (disabled ? "#e5e7eb" : "#007bff")};
  color: #fff;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  ${({ disabled }) => disabled && "cursor:not-allowed"};
`;
