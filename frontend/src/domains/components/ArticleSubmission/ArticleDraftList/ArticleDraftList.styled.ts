import styled from "@emotion/styled";
import { textOverflowEllipsis } from "@/styles/global.styled";

export const ArticleDraftList = styled.ul`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
`;

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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
`;

export const ArticleDraftBadge = styled.span<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
`;

export const ArticleDraftTitle = styled.h3`
  font-size: 1.25rem;
  min-height: 2.5rem;
  ${textOverflowEllipsis(2)}
`;

export const ArticleDraftDescription = styled.p`
  font-size: 0.75rem;
  min-height: 2.25rem;
  ${textOverflowEllipsis(3)}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
`;
