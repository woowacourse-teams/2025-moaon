import styled from "@emotion/styled";

const VAR1 = "rgba(96,165,250,0.22)";
const VAR2 = "rgba(125,211,252,0.16)";
const VAR3 = "rgba(59,130,246,0.22)";

export const IconBadge = styled.li<{ fontSize: number }>`
  padding: 0.5rem 1rem;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize}px;
  gap: 0.5rem;
  color: #464646;

  /* Liquid glass layering: subtler tint + border */
  background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.18),
        rgba(255, 255, 255, 0.06)
      )
      padding-box,
    linear-gradient(135deg, ${VAR1} 0%, ${VAR2} 60%, ${VAR3} 100%) border-box;
  border: 2px solid transparent;
  backdrop-filter: blur(14px) saturate(160%);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 -1px 0 rgba(255, 255, 255, 0.16);
`;

export const Icon = styled.img<{ iconsSize: number }>`
  width: ${({ iconsSize }) => iconsSize}px;
  aspect-ratio: 1/1;
`;
