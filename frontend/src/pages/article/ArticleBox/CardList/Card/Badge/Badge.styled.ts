import styled from "@emotion/styled";

export const BadgeContainer = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 0.4rem 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
`;

export const BadgeText = styled.span`
  font-size: 0.875rem;
  color: #fff;
  line-height: 1;
  vertical-align: middle;
`;
