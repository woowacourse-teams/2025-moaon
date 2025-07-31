import styled from "@emotion/styled";

export const IconBadge = styled.li<{ fontSize: number; color: string }>`
  padding: 0.6rem 1.2rem;
  border: 1px solid ${({ color }) => (color === "black" ? "#9b9b9bff" : color)};
  border-radius: 30px;
  display: flex;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize}px;
  gap: 0.6rem;
  color: ${({ color }) => color};
`;

export const Icon = styled.img<{ iconsSize: number }>`
  width: ${({ iconsSize }) => iconsSize}px;
  aspect-ratio: 1/1;
`;
