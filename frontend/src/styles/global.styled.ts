import { css, keyframes } from "@emotion/react";

export const textOverflowEllipsis = (lineClamp: number) => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lineClamp};
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
`;

export const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const shimmerGradient = css`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s infinite;
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
`;

export const hoverUnderline = (color: string = "#000") => css`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 0.0938rem;
    bottom: -0.1875rem;
    left: 0;
    background-color: ${color};
    transform-origin: bottom left;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;
