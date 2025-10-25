import styled from "@emotion/styled";
import { textOverflowEllipsis } from "@/styles/global.styled";

export const ArticleDraftItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  gap: 0.5rem;
  position: relative;
  isolation: isolate;

  &:hover {
    transition: 0.25s linear;
    box-shadow: rgba(58, 103, 215, 0.2) 0px 7px 29px 0px;
  }
`;

export const ArticleDraftItemDetailButton = styled.button`
  position: absolute;
  inset: 0;
  opacity: 0;
`;

export const ArticleDraftHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  font-weight: 500;
`;

export const ArticleDraftBadge = styled.span<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
`;

export const ArticleDraftTitle = styled.h3`
  font-size: 1rem;
  line-height: 1.4;
  min-height: 2.5rem;
  ${textOverflowEllipsis(2)}
`;

export const ArticleDraftDescription = styled.p`
  font-size: 0.75rem;
  line-height: 1.6;
  min-height: 2.25rem;
  ${textOverflowEllipsis(3)}
`;

export const CloseButtonBox = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  gap: 0.75rem;
`;
