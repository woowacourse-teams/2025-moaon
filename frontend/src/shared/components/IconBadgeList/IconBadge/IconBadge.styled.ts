import styled from "@emotion/styled";

export const IconBadge = styled.li<{ fontSize: number; primaryColor: string }>`
  padding: 0.6rem 1.2rem;
  border: 1px solid ${({ primaryColor }) => primaryColor};
  border-radius: 30px;
  display: flex;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize}px;
  gap: 0.6rem;
  color: ${({ primaryColor }) => primaryColor};
`;

export const Icon = styled.img<{ iconsSize: number }>`
  width: ${({ iconsSize }) => iconsSize}px;
  aspect-ratio: 1/1;
`;
