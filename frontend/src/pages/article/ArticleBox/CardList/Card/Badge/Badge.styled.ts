import styled from "@emotion/styled";

export const BadgeContainer = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 0.25rem 0.625rem;
  border-radius: 12px;
`;

export const BadgeText = styled.span`
  color: #555555;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
`;
