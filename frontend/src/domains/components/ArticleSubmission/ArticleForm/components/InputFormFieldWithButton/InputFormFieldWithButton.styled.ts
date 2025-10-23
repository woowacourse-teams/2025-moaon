import styled from "@emotion/styled";

export const InputFormFieldWithButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const InputFormFieldText = styled.p<{ isTokenZero: boolean }>`
  width: 100%;
  font-size: 0.75rem;
  line-height: 1.6;
  ${({ isTokenZero }) => isTokenZero && "color:#f00;"};
`;
