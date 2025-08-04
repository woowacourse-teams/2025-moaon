import styled from "@emotion/styled";

export const CardContainer = styled.a`
  border: 1px solid #d1d6dd;
  padding: 1rem 1.375rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25;
`;

export const CardSummary = styled.span`
  font-size: 0.8125rem;
  line-height: 1.25;
  color: #555555;
`;
