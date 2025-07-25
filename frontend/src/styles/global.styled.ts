import { css } from "@emotion/react";

export const textOverflowEllipsis = (lineClamp: number) => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lineClamp};
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
`;
