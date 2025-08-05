import styled from "@emotion/styled";

export const IconBadge = styled.li<{ fontSize: number }>`
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize}px;
  gap: 0.6rem;
  color: #464646;
`;

export const Icon = styled.img<{ iconsSize: number }>`
  width: ${({ iconsSize }) => iconsSize}px;
  aspect-ratio: 1/1;
`;
